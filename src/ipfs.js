const IPFS = require('ipfs');
const fs = require('fs/promises');
const { resolve } = require('path');

let node;
IPFS.create().then(_node => {
  node = _node;
});

const addFile = async filePath => {
  const { cid } = await node.add(await fs.readFile(filePath));
  return `ipfs://${cid}`;
};

const addSite = async sitePath => {
  const results = [];
  let files = await getFiles(sitePath);
  files = await Promise.all(
    files.map(async file => ({
      path: file.replace(sitePath, 'site/'),
      content: await fs.readFile(file)
    }))
  );
  for await (const result of node.addAll(files)) {
    results.push(result);
  }
  return `ipfs://${results[results.length - 1].cid}`;
};

const getFiles = async dir => {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(dirent => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
};

module.exports = { addFile, addSite };
