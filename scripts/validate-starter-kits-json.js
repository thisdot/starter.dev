const simpleGit = require('simple-git');
const path = require('path');
const { exec } = require('child_process');
const repoRoot = path.resolve(__dirname, '..');
const g = simpleGit(repoRoot);
const { promisify } = require('util')

main();

async function main() {
  await promisify(exec)('yarn generate-starter-kits-json')
  const [starterKitsJsonDiff] = await g.diff(['starter-kits.json']);

  if (starterKitsJsonDiff) {
    console.error('starter-kits.json file is not up to date. Please run `yarn generate-starter-kits-json` to regenerate the file');
    process.exit(1);
  }
}

