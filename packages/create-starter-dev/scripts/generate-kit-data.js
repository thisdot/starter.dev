const path = require('path');
const fs = require('fs/promises');

function getRepoRootPath() {
  return path.resolve(__dirname, '../../../');
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

async function getKitsData() {
  const repoPath = await getRepoRootPath();
  const kitDirs = await getKitDirs();
  const kitsData = [];
  for (const dir of kitDirs) {
    const kitPath = path.join(repoPath, 'starters', dir);

    try {
      const json = await fs.readFile(path.join(kitPath, 'package.json'), 'utf-8');
      const data = JSON.parse(json);
      kitsData.push({
        value: dir,
        title: data.description,
      });
    } catch (err) {
      console.error(`Failed to get kit: ${kitPath}`);
    }
  }
  return kitsData;
}

///////////////////////////////////////////////////////////////////////////////
// SCRIPT MAIN
////////////////////////////////////////////////////////////////////////////////

(async () => {
  const distDir = path.resolve(__dirname, '../dist');
  const kitsData = await getKitsData();

  try {
    await fs.mkdir(distDir, { recursive: true });
    await fs.writeFile(path.join(distDir, 'starters.json'), JSON.stringify(kitsData));
  } catch (err) {
    console.error('Failed to write kits data to starters.json');
  }

  console.log('Succesfully generated starters.json');
})();
