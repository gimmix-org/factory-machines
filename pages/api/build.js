import _copydir from 'copy-dir';
import { promisify } from 'util';
import { exec as _exec } from 'child_process';
import fs from 'fs/promises';
const copydir = promisify(_copydir);
const exec = promisify(_exec);

const api = async (req, res) => {
  const { config } = req.body;
  const tmpPath = `/tmp/${config.contractAddress}`;
  await copydir(`templates/${config.template}`, tmpPath, {});
  await fs.writeFile(`${tmpPath}/factory.config.js`, factoryConfig(config));
  const data = await exec(
    `cd ${tmpPath} && yarn && yarn build && yarn export && zip -r site.zip ./out`
  );
  console.log(data);
  const file = await fs.readFile(`${tmpPath}/site.zip`);
  res.setHeader('content-type', 'application/zip');
  return res.send(file);
};

export default api;

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
