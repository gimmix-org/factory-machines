const fs = require('fs/promises');
const path = require('path');
const { exec: _exec } = require('child_process');
const { promisify } = require('util');
const exec = promisify(_exec);
const { addSite, addFile } = require('./ipfs');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const processor = async job => {
  const config = job.data;

  const templatePath = path.join(
    process.cwd(),
    `${process.env.BUILD_BOX_PATH}/templates/${config.template}`
  );
  const outDirPath = path.join(
    process.cwd(),
    `${process.env.BUILD_BOX_PATH}/builds/${config.contractAddress}`
  );

  // Set up a "build-box" folder so we don't need to reinstall or duplicate node_modules for each build
  try {
    // If the version is different, delete it and copy over the new one
    const buildBoxPackage = JSON.parse(
      await fs.readFile(`${templatePath}/package.json`, 'utf-8')
    );
    const currentPackage = JSON.parse(
      await fs.readFile(`templates/${config.template}/package.json`, 'utf-8')
    );
    if (buildBoxPackage.version != currentPackage.version) {
      await fs.rmdir(templatePath);
      throw new Error('Update the package in the build box.');
    }
  } catch (err) {
    // console.log(err);
    console.log(`Copying template to Build Box.`);
    await exec(`mkdir -m 777 -p ${templatePath}`);
    await exec(`mkdir -m 777 -p ${process.env.BUILD_BOX_PATH}/builds`);
    await exec(
      `cp -r templates/${config.template} ${process.env.BUILD_BOX_PATH}/templates`
    );
    await exec(`cd ${templatePath} && yarn`);
  }
  job.progress(25);

  // Write config file to build box
  await fs.writeFile(
    `${templatePath}/factory.config.js`,
    factoryConfig(config)
  );

  // Build site
  try {
    await exec(`cd ${templatePath} && yarn build`);
  } catch (err) {}
  job.progress(50);

  // Export to static and zip
  await exec(`cd ${templatePath} && yarn export -o ${outDirPath}`);
  await exec(
    `cd ${outDirPath} && zip -r ${path.join(
      `${outDirPath}/`,
      `..`,
      `${config.template.toUpperCase()}_${config.contractAddress}_static.zip`
    )} *`
  );
  job.progress(55);

  // Copy source files to tmp directory and zip
  await exec(
    `rsync -avr --exclude='.next' --exclude='node_modules' ${templatePath}/ ${outDirPath}_tmp`
  );
  await exec(
    `cd ${outDirPath}_tmp && zip -r ${path.join(
      `${outDirPath}_tmp/`,
      `..`,
      `${config.template.toUpperCase()}_${config.contractAddress}_source.zip`
    )} *`
  );
  job.progress(65);

  // Cleanup files for next build
  await exec(`rm ${templatePath}/factory.config.js`);
  job.progress(75);

  // Upload files to IPFS
  const siteUrl = await addSite(outDirPath);
  const staticZipUrl = await addFile(
    path.join(
      `${outDirPath}/`,
      `..`,
      `${config.template.toUpperCase()}_${config.contractAddress}_static.zip`
    )
  );
  const sourceZipUrl = await addFile(
    path.join(
      `${outDirPath}_tmp/`,
      `..`,
      `${config.template.toUpperCase()}_${config.contractAddress}_source.zip`
    )
  );
  await exec(`rm -rf ${outDirPath}`);
  await exec(`rm -rf ${outDirPath}_tmp`);
  await exec(
    `rm -rf ${path.join(
      `${outDirPath}/`,
      `..`,
      `${config.template.toUpperCase()}_${config.contractAddress}_static.zip`
    )}`
  );
  await exec(
    `rm -rf ${path.join(
      `${outDirPath}_tmp/`,
      `..`,
      `${config.template.toUpperCase()}_${config.contractAddress}_source.zip`
    )}`
  );

  job.progress(100);

  console.log(
    `Successfully built ${config.template} for ${config.creatorAddress}`
  );
  return { siteUrl, staticZipUrl, sourceZipUrl };
};

module.exports = processor;

const factoryConfig = config =>
  `module.exports = ${JSON.stringify(config, null, 2)};`;
