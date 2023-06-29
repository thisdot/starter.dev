const path = require('path');
const fs = require('fs/promises');
const pick = require('just-pick');
const rimraf = require('rimraf');
const { getRepoRootPath, getKitDirs } = require('../../../scripts/kits-utils');
const { generate } = require('./generate');
///////////////////////////////////////////////////////////////////////////////
// SCRIPT MAIN
////////////////////////////////////////////////////////////////////////////////

(async () => {
  await generate(false, 'packages/website/src/showcases');
  // const repoPath = getRepoRootPath();
  // const showcasesPath = path.join(repoPath, 'packages/website/src/showcases');
  // // `${showcasesPath}/showcases.tsx`
  // try {
  //   const handle = await fs.opendir(showcasesPath);
  //   console.info('showcasegen: deleting existing showcase file');
  //   rimraf(`${showcasesPath}/showcases.tsx`, async (err) => {
  //     if (err) {
  //       console.error(err);
  //     }
  //     await handle.close();
  //   });
  // } catch (err) {
  //   if (err && err.code === 'ENOENT') {
  //     console.info('showcasegen: creating showcase file');
  //     await fs.mkdir(showcasesPath);
  //   }
  // }

  // const kitDirs = await getKitDirs();
  // const showcases = [];

  // console.info('showcasegen: generating showcases');
  // for (const dir of kitDirs) {
  //   const kitPath = path.join(repoPath, 'starters', dir);

  //   let infoFile = 'package.json';
  //   if (dir.startsWith('deno-')) {
  //     // For Deno, we don't have package.json
  //     infoFile = 'deno.json';
  //   }

  //   try {
  //     const json = await fs.readFile(path.join(kitPath, infoFile), 'utf-8');
  //     const data = JSON.parse(json);

  //     const pickData = {
  //       ...pick(data, ['showcase']),
  //     };
  //     console.log(pickData);
  //     Object.entries(pickData).map(([key, value]) => {
  //       value.map((item) => {
  //         showcases.push(item);
  //       });
  //     });
  //   } catch (err) {
  //     console.error(
  //       `SHOWCASEGEN: failed to write kit page for ${dir}: ${err.message}`
  //     );
  //   }
  // }

  // try {
  //   const showcasePath = path.join(
  //     repoPath,
  //     'packages/website/src/showcases/showcases.tsx'
  //   );

  //   await fs.writeFile(showcasePath, JSON.stringify(showcases), 'utf-8');
  // } catch (error) {
  //   console.error(
  //     `SHOWCASEGEN: failed to write showcase page: ${error.message}`
  //   );
  // }
})();
