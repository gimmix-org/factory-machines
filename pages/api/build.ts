import _copydir from 'copy-dir';
import { promisify } from 'util';
import { exec as _exec } from 'child_process';
import fs from 'fs/promises';
import { NextApiHandler } from 'next';
const copydir = promisify(_copydir);
const exec = promisify(_exec);

const api: NextApiHandler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://factory.gimmix.org');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if (req.method == 'POST') {
    const { config } = req.body;
    const tmpPath = `/tmp/${config.contractAddress}`;
    try {
      await fs.access(`${tmpPath}/site.zip`);
    } catch (err) {
      console.log({ err });
      await build(config);
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
      console.log({ err });
      return res.json({ error: 'Not found' });
    }
  }
};

export default api;

const build = async (config: any) => {
  console.log('Building', { config });
  try {
    const tmpPath = `/tmp/${config.contractAddress}`;
    await copydir(`templates/${config.template}`, tmpPath, {});
    await fs.writeFile(`${tmpPath}/factory.config.js`, factoryConfig(config));
    await exec(`cd ${tmpPath} && yarn`);
    await exec(`cd ${tmpPath} && yarn build && yarn export`);
    await exec(`cd ${tmpPath} && zip -r site.zip ./out`);
  } catch (err) {
    console.log({ buildError: err });
  }
};

const factoryConfig = (config: any) =>
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
    rpcUrl: '${config.rpcUrl}'
  };`;
