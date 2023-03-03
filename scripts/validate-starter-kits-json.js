const simpleGit = require('simple-git');
const path = require('path');
const repoRoot = path.resolve(__dirname, '..');
const g = simpleGit(repoRoot);

main()

async function main() {
  const [starterKitsJsonDiff] = await g.diff(['starter-kits.json'])

  if(starterKitsJsonDiff) {
    console.error('starter-kits.json file is not up to date. Please run `yarn generate-starter-kits` to regenerate the file')
    process.exit(1)
  }
}

