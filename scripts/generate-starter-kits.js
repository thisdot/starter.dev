const path = require('path');
const fs = require('fs/promises');
const pick = require('just-pick');


void main();

async function main() {
  const kitDirs = await getKitDirs();

  const kitsMetadataResult = await Promise.allSettled(kitDirs.map(getKitMetadata));
  const kitsJson = kitsMetadataResult.filter((result) => result.status === 'fulfilled').map(({ value }) => value).reduce((kitsResult, {
    name,
    description,
  }) => ({
    ...kitsResult,
    [name]: description,
  }), {});

  const repoPath = getRepoRootPath();
  await fs.writeFile(path.resolve(repoPath, 'starter-kits.json'), JSON.stringify(kitsJson, undefined, 2) + '\n', 'utf-8');
}

async function getKitMetadata(kitDir) {
  const startersPath = path.resolve(getRepoRootPath(), 'starters');
  const kitFullDir = path.resolve(startersPath, kitDir);
  try {
    let packageJsonPath = path.join(kitFullDir, 'package.json');
    await fs.access(packageJsonPath);
    const fileContentStr = await fs.readFile(packageJsonPath, 'utf-8');
    const fileContent = JSON.parse(fileContentStr);
    return pick(fileContent, ['name', 'description']);
  } catch {}
  try {
    let packageJsonPath = path.join(kitFullDir, 'deno.json');
    await fs.access(packageJsonPath);
    const fileContentStr = await fs.readFile(packageJsonPath, 'utf8');
    const fileContent = JSON.parse(fileContentStr);
    return pick(fileContent, ['name', 'description']);
  } catch {}

  const errorMessage = `Could not find package.json or deno.json for kit "${kitDir}".`;
  console.warn(errorMessage)
  throw new Error(errorMessage)
}

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
