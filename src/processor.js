const fs = require('fs/promises');
const path = require('path');
const { exec: _exec } = require('child_process');
const { promisify } = require('util');
const exec = promisify(_exec);
const { addSite } = require('./ipfs');
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
    console.log(err);
    console.log(`Copying template to Build Box.`);
    await exec(`mkdir -m 777 -p ${templatePath}`);
    await exec(`mkdir -m 777 -p ${process.env.BUILD_BOX_PATH}/builds`);
    await exec(
      `cp -r templates/${config.template} ${process.env.BUILD_BOX_PATH}/templates`
    );
    await exec(`cd ${templatePath} && yarn`);
  }
  job.progress(25);

  await fs.writeFile(
    `${templatePath}/factory.config.js`,
    factoryConfig(config)
  );

  try {
    await exec(`cd ${templatePath} && yarn build`);
  } catch (err) {}
  job.progress(50);

  await exec(`cd ${templatePath} && yarn export -o ${outDirPath}`);
  await exec(`rm ${templatePath}/factory.config.js`);

  job.progress(75);
  const ipfsUrl = await addSite(outDirPath);

  await exec(`rm -rf ${outDirPath}`);

  job.progress(100);

  console.log(
    `Successfully built ${config.template} for ${config.creatorAddress}`
  );
  return { ipfsUrl };
};

module.exports = processor;

const factoryConfig = config =>
  `module.exports = ${JSON.stringify(config, null, 2)};`;
