import { bold, gray, green, red } from 'kleur/colors';
import prompts from 'prompts';
import degit from 'degit';
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
      validate: (value) => (value.length > 0 ? true : 'Please enter a name'),
    },
  ]);

  if (!options.kit || !options.name) {
    process.exit(1);
  }

  const templateTarget = `thisdot/starter.dev/starters/${options.kit}#latest ${options.name}`;

  const emitter = degit(templateTarget, {
    cache: false,
    force: true,
    verbose: false,
  });

  try {
    console.log(`${green(`>`)} ${gray(`Copying project files...`)}`);
    await emitter.clone(process.cwd());
  } catch (err: any) {
    console.error(red(err.message));
    process.exit(1);
  }
}
