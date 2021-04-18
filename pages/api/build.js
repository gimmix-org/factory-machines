import _copydir from 'copy-dir';
import { promisify } from 'util';
import { exec as _exec } from 'child_process';
import fs from 'fs/promises';
const copydir = promisify(_copydir);
const exec = promisify(_exec);

const api = async (req, res) => {
  if (req.method == 'POST') {
    const { config } = req.body;
    console.log('Posting', { config });
    const tmpPath = `/tmp/${config.contractAddress}`;
    try {
      await fs.access(`${tmpPath}/site.zip`);
    } catch (err) {
      build(config);
    }
    return res.json({ built: true });
  } else {
    const { contractAddress } = req.query;
    const tmpPath = `/tmp/${contractAddress}`;
    try {
      const file = await fs.readFile(`${tmpPath}/site.zip`);
      res.setHeader('content-type', 'application/zip');
      res.setHeader('Cache-Control', 's-maxage=216000');
      return res.send(file);
    } catch (err) {
      return res.json({ error: 'Not found' });
    }
  }
};

export default api;

const build = async config => {
  console.log('Building', { config });
  const tmpPath = `/tmp/${config.contractAddress}`;
  console.log(await copydir(`templates/${config.template}`, tmpPath, {}));
  console.log(
    await fs.writeFile(`${tmpPath}/factory.config.js`, factoryConfig(config))
  );
  console.log(await exec(`cd ${tmpPath} && yarn`));
  console.log(await exec(`cd ${tmpPath} && yarn build && yarn export`));
  console.log(await exec(`cd ${tmpPath} && zip -r site.zip ./out`));
};

const factoryConfig = config =>
  `module.exports = {
    name: '${config.name}',
    description: '${config.description}',
    url: '${config.url}',
  
    // Don't change anything below this line unless you know what you're doing!
    contractAddress: '${config.contractAddress}',
    creatorAddress: '${config.creatorAddress}',
    chainId: ${config.chainId},
    ipfsBase: '${config.ipfsBase}',
    ipfsUploadFile: '${config.ipfsUploadFile}',
    ipfsUploadJson: '${config.ipfsUploadJson}',
    infuraUrl: '${config.infuraUrl}'
  };`;
