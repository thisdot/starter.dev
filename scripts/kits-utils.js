const path = require('path');
const fs = require('fs/promises');

function getRepoRootPath() {
  return path.resolve(__dirname, '../');
}

async function getKitDirs() {
  const startersPath = path.resolve(getRepoRootPath(), 'starters');
  const dirItems = await fs.readdir(startersPath);
  const kitDirs = [];
  for (const item of dirItems) {
    const stats = await fs.stat(startersPath + '/' + item);
    if (stats.isDirectory() && item.charAt(0) !== '.') {
      kitDirs.push(item);
    }
  }
  return kitDirs;
}

module.exports = {
  getRepoRootPath,
  getKitDirs
}
