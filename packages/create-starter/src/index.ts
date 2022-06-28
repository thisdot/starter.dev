import path from 'path';
import fs from 'fs/promises';
import { bold, gray, green, red, cyan } from 'kleur/colors';
import prompts, { Choice } from 'prompts';
import degit from 'tiged';
import fetch from 'node-fetch';

const STARTER_KITS_JSON_URL = 'https://raw.githubusercontent.com/thisdot/starter.dev/main/starter-kits.json';

export async function main() {
  console.log(`\n${bold('Welcome to starter.dev!')} ${gray('(create-starter)')}`);

  let starters: Choice[] = [];

  try {
    const res = await fetch(STARTER_KITS_JSON_URL);
    if (res.ok) {
      const starterKitsJSON = await res.json();
      if (typeof starterKitsJSON === 'object' && starterKitsJSON !== null) {
        starters = Object.entries(starterKitsJSON).map(([name, description]) => ({
          value: name as string,
          title: description as string,
        }));
      }
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error(bold(red('Failed to fetch list of available starter kits')));
    process.exit(1);
  }

  const options = await prompts([
    {
      type: 'select',
      name: 'kit',
      message: 'Which starter kit would you like to use?',
      choices: starters,
    },
    {
      type: 'text',
      name: 'name',
      message: 'What is the name of your project?',
    },
  ]);

  if (!options.kit || !options.name) {
    process.exit(1);
  }

  const repoPath = `thisdot/starter.dev/starters/${options.kit}`;
  let parentDir = process.env.INIT_CWD || process.cwd();

  const localStarterDevPackageJsonPath = path.join(parentDir, 'package.json');
  const PACKAGE_NAME_STARTER_DEV = 'starter.dev';
  let isLocalStarterDev = false;
  try {
    const localStarterDevPackageJson = JSON.parse(await fs.readFile(localStarterDevPackageJsonPath, 'utf8'));
    if(localStarterDevPackageJson.name === PACKAGE_NAME_STARTER_DEV) {
      console.log(`${PACKAGE_NAME_STARTER_DEV} package detected.`);
      isLocalStarterDev = true;
      parentDir = path.resolve(parentDir, '..');
    }   
  } catch {
    isLocalStarterDev = false;
  }

  const destPath = path.join(parentDir, options.name);

  const emitter = degit(repoPath, {
    cache: false,
    force: true,
    verbose: false,
    mode: 'tar',
  });

  try {
    console.log(`${green(`>`)} ${gray(`Downloading starter kit...`)}`);
    await emitter.clone(destPath);
  } catch (err: unknown) {
    console.error(red(err instanceof Error ? err.message : 'Failed to download starter kit'));
    process.exit(1);
  }

  const packageJSON = JSON.parse(await fs.readFile(path.join(destPath, 'package.json'), 'utf8'));
  packageJSON.name = options.name;
  packageJSON.version = '0.1.0';
  await fs.writeFile(path.join(destPath, 'package.json'), JSON.stringify(packageJSON, null, 2));

  console.log(bold(green('✔') + ' Done!'));
  console.log('\nNext steps:');
  console.log(` ${bold(cyan(`cd ${isLocalStarterDev ? '../' : ''}${options.name}`))}`);
  console.log(` ${bold(cyan('npm install'))} (or pnpm install, yarn, etc)`);
}
