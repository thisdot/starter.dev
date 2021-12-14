import path from 'path';
import fs from 'fs/promises';
import { bold, gray, green, red, cyan } from 'kleur/colors';
import prompts from 'prompts';
import degit from 'tiged';
import starters from './starters';

export async function main() {
  console.log(`\n${bold('Welcome to starter.dev!')} ${gray('(create-starter)')}`);

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
  const destPath = path.join(process.cwd(), options.name);

  const emitter = degit(repoPath, {
    cache: false,
    force: true,
    verbose: false,
    mode: 'git', // @todo: change to 'tar' when repo is public
  });

  try {
    console.log(`${green(`>`)} ${gray(`Downloading starter kit...`)}`);
    await emitter.clone(destPath);
  } catch (err: any) {
    console.error(red(err.message));
    process.exit(1);
  }

  const packageJSON = JSON.parse(await fs.readFile(path.join(destPath, 'package.json'), 'utf8'));
  packageJSON.name = options.name;
  packageJSON.version = '0.1.0';
  await fs.writeFile(path.join(destPath, 'package.json'), JSON.stringify(packageJSON, null, 2));

  console.log(bold(green('✔') + ' Done!'));
  console.log('\nNext steps:');
  console.log(` ${bold(cyan(`cd ${options.name}`))}`);
  console.log(` ${bold(cyan('npm install'))} (or pnpm install, yarn, etc)`);
}
