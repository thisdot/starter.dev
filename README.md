# starter.dev

This is a monorepo for the [starter.dev](https://starter.dev/) project.

- `/packages` - Includes the starter.dev website and CLI
- `/starters` - Directory of all starter kit projects

[starter.dev](https://starter.dev/) is a collection of starter kit projects and related tools to help get you up and running on your next project without spending days adding all the pieces and configuration to supporting whatever libraries or frameworks that you choose. Choose a kit with the set of tools you are looking for and use our CLI to generate your new project. The starter kits come with all the essentials included and configured, such as TypeScript, testing, linting, storybook, and more.

## How to run the scaffolding script

In the command line, run `npx @this-dot/create-starter` and you will see the list of available starter kits. Select the kit you are interested in and name your new project. Once the installation is complete, `cd` into your new project and install the dependencies(`npm install`, `yarn`, etc.) Now you are ready to get started with your brand new project.

## Starter kit essentials

Starter kits should include a set of frameworks, libraries, and essential tooling. Each starter kit should include a couple of core examples that utilize the tech included in the kit.

### Frameworks and libraries

Starter kits should include some core libraries and technologies that a new project will need. These pieces should come configured according to best practices and be ready to use togther as a unit.

- Framework?: (Next, Nuxt, SvelteKit, Remix, etc)
- Core UI: (React, Vue, Angular, etc)
- Data Fetching and/or State Management: (redux, ngrx, rxjs, react-query, apollo, etc)
- Styling: (tailwind, styled-components, css modules, etc)

### Tooling

Starter kits should include some core tooling that are configured and ready to use.

- Linting
- Unit Testing (jest, vitest, testing-library, etc)
- Storybook
- Prettier

### Included example code

Each starter kit should include a couple base examples that demonstrate the important pieces of tech included in the kit and the tooling used to test them. Each one includes tests and stories.

- Counter component (showcase the UI framework and how to write tests for it)
- Hello world component (showcase the data fetching and rendering)

## Adding a starter kit

Starter kits live at `starters/:name` in this repository.

### Starter kit naming convention

The name of a starter kit should highlight the core technologies that it uses and that differentiate it from other starter kits. In example: `next12-react-query-tailwind` - _framework: next, state management: react-query, styling: tailwind_.

### `package.json` requirements

For proper integration with the starter-dev CLI and website there are also some requirements and convention to follow in the starter kit's `package.json` file.

- `description` - This field is used as a short description highlighting the technologies of each particular starter kit. It is shown as a selection in the starter-dev CLI. Example: `NextJS, React Query, and TailwindCSS`
- `keywords` - This field is an array of strings used to map to the technology list on the starter.dev website. Example: `["next", "react-query", "tailwind"]`
- `hasShowcase` - This field is a boolean and is required when displaying the "View Showcase" link for kits that have showcases. If your kit has a showcase, set the value to `true`. If your kit does not have a showcase, set the value to `false`.

### Adding starter kit to the website

They `keyword` field in your starter kit's `package.json` categorizes/tags each starter kit on the website. For a reference of the keys that should be used here take a look at the`package/website/src/config.tsx` file. If a particular technology you're needing is missing from the`TECHNOLOGIES` list, please open a PR to add it including an icon _(if available)_.

Once you've added your description, keywords, and made sure the keywords exist in the `TECHNOLOGIES` list in the websites `config.tsx` file, your starter kit will automatically be added to the website and deployed once you merge into the `main` branch.

### Adding starter kit to the CLI

Currently to add your starter kit to be an available option on the starter.dev CLI, you'll need to add an entry to the `starter-kits.json` file in the root of this repo. The key should be your starter kits package/directory name, and the value should be it's package.json `description` field. Look at current items as an example. Later down the line this process will be automated but it is currently a manual step.

### Starter kit README files

We are still working on defining a general structure and format for starter kit readme files. These are particularly important because the starter kit page on the website is based on the readme files. See: [next12-react-query-tailwind readme content #17](https://github.com/thisdot/starter.dev/pull/17)
