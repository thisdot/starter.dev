import path from 'path';
import fs from 'fs/promises';
import { bold, gray, green, red, cyan } from 'kleur/colors';
import prompts, { Choice } from 'prompts';
import degit from 'tiged';
import fetch from 'node-fetch';
import yargs from 'yargs-parser';
import { initGitRepo, removeLockFileIfExists, overrideAngularJsonIfExists, fileExists } from './utils';
import { trackSelectedKit } from './metrics';

const STARTER_KITS_JSON_URL = 'https://raw.githubusercontent.com/thisdot/starter.dev/main/starter-kits.json';
const EXCLUDED_PACKAGE_JSON_FIELDS = ['hasShowcase'];
const PACKAGE_MANAGERS: string[] = ['npm', 'pnpm', 'yarn'];

export async function main() {
  console.log(`\n${bold('Welcome to starter.dev!')} ${gray('(create-starter)')}`);

  const cleanArgv = process.argv.filter((arg) => arg !== '--');
  const args = yargs(cleanArgv);
  prompts.override(args);

  let starters: Choice[] = [];

  try {
    const res = await fetch(STARTER_KITS_JSON_URL);
    if (res.ok) {
      const starterKitsJSON = await res.json();
      if (typeof starterKitsJSON === 'object' && starterKitsJSON !== null) {
        starters = Object.entries(starterKitsJSON)
          .map(([name, description]) => ({
            value: name as string,
            title: description as string,
          }))
          .sort((a, b) => a.title.localeCompare(b.title));
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
      type: 'autocomplete',
      name: 'kit',
      message: 'Which starter kit would you like to use?',
      choices: starters,
      suggest: (input, choices) => Promise.resolve(choices.filter((c) => c.title.includes(input))),
    },
    {
      type: 'text',
      name: 'name',
      message: 'What is the name of your project?',
    },
    {
      type: 'autocomplete',
      name: 'packageManager',
      message: 'Which package manager would you like to use?',
      choices: PACKAGE_MANAGERS.map((pm) => ({ title: pm, value: pm })),
      suggest: (input, choices) => Promise.resolve(choices.filter((c) => c.title.includes(input))),
    },
  ]);

  if (!options.kit || !options.name || !options.packageManager) {
    process.exit(1);
  }

  const [createSelectedKitResult] = await Promise.allSettled([createStarter(options), trackSelectedKit(options.kit)]);

  if (createSelectedKitResult.status === 'rejected') {
    const err = createSelectedKitResult.reason;
    console.error(red(err instanceof Error ? err.message : `Creating starter kit failed`));
    process.exit(1);
  }
}

async function createStarter(options: prompts.Answers<'name' | 'kit' | 'packageManager'>): Promise<void> {
  const repoPath = `thisdot/starter.dev/starters/${options.kit}`;
  const destPath = path.join(process.cwd(), options.name);
  const packageManager = options.packageManager;

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
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error('Failed to download starter kit');
    }
  }

  try {
    const packageJsonPath = path.join(destPath, 'package.json');
    const packageJsonExists = await fileExists(packageJsonPath);
    if (packageJsonExists) {
      // Node-based starter kit
      await initNodeProject(packageJsonPath, destPath, options);
    }

    await initGitRepo(destPath, packageManager);
    console.log(bold(green('✔') + ' Done!'));
    console.log('\nNext steps:');
    console.log(` ${bold(cyan(`cd ${options.name}`))}`);

    if (packageJsonExists) {
      switch (packageManager) {
        case 'yarn':
          console.log(`${bold(cyan(`${packageManager} dev`))}`);
          break;
        default:
          console.log(`${bold(cyan(`${packageManager} start`))}`);
      }
    }
  } catch (err: unknown) {
    throw new Error('Failed to initialize the starter kit. This probably means that you provided an invalid kit name.');
  }
}

async function initNodeProject(packageJsonPath: string, projectDestPath: string, options: prompts.Answers<'name' | 'kit'>) {
  const packageJSON = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
  packageJSON.name = options.name;
  packageJSON.version = '0.1.0';
  EXCLUDED_PACKAGE_JSON_FIELDS.forEach((field) => delete packageJSON[field]);

  try {
    await fs.writeFile(path.join(projectDestPath, 'package.json'), JSON.stringify(packageJSON, null, 2));
    await overrideAngularJsonIfExists(projectDestPath, options.kit, options.name);

    await removeLockFileIfExists('package-lock.json', projectDestPath);
    await removeLockFileIfExists('yarn.lock', projectDestPath);
    await removeLockFileIfExists('pnpm-lock.yaml', projectDestPath);
  } catch (_) {
    console.info(gray(`> ${bold('Note:')} Failed to update package.json. You may need to do this manually.`));
  }
}
