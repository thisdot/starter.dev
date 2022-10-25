# svelte-kit-scss Starter Kit

This starter kit features **Svelte** and **SCSS**

## Table of Contents

- [svelte-kit-scss Starter Kit](#svelte-kit-scss-starter-kit)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Included Tooling](#included-tooling)
    - [Architecture Decisions](#architecture-decisions)
  - [Installation](#installation)
    - [CLI (Recommended)](#cli-recommended)
    - [Manual](#manual)
  - [Commands](#commands)
  - [Demo Implementation](#demo-implementation)

## Overview

### Tech Stack

- [Svelte v3.x](https://svelte.dev/)
- [SvelteKit v1.x](https://kit.svelte.dev/) - svelte app builder
- [Sass](https://sass-lang.com/) - Styling language

### Included Tooling

- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [Vite](https://vitejs.dev/) - Bundler
- [Vitest](https://vitest.dev/) - Unit Test Framework

### Architecture Decisions

For this kit, we maintained the [Sveltekit Project Strucuture](https://kit.svelte.dev/docs/project-structure) and we do recommend it. For the `src/lib/components` folder, each component is co-located with its tests and stories. This structure makes it easy to find all the code and functionality related to a specific component. Due to Sveltekit's preference for data fetching from the route page, the components are primarily simple view components.

- #### Storybook

  Storybook was introduced because it is really a great tool for testing components in isolation and good for documentation.

- #### Styling

  Svelte comes with sass support. Sass being one of the most mature, stable, and powerful professional grade CSS extension language, it quickly allows us to design robust components.

- #### Example Components

  In this `svelte-kit-scss/src/lib/components` directory you will find the `Counter` and `Greeting` directory.

  The `Counter` directory contains the following files:

  - Counter.spec.ts
  - Counter.svelte
  - Counter.stories.ts

  The `Greeting` directory contains the following files:

  - Greeting.spec.ts
  - Greeting.svelte
  - Greeting.stories.ts

## Installation

### CLI (Recommended)

```bash
npm create @this-dot/starter --kit svelte-kit-scss
```

or

```bash
yarn create @this-dot/starter --kit svelte-kit-scss
```

- Follow the prompts to select the `svelte-kit-scss` starter kit and name your new project.
- `cd` into your project directory and run `npm`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:5137` to see the included example code running.

### Manual

Note: The command below clones the entire repository, including other starter kits.

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/svelte-kit-scss` directory to the name of your new project.
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:5137` to see the included example code running.

## Commands

- `npm run dev` - Starts the development server.
- `npm run test` - Runs the unit tests.
- `npm run test:e2e` - Runs the playwright e2e tests.
- `npm run storybook` - Starts the Storybook UI.
- `npm run format` - Formats code with prettier for the entire project.
- `npm run build` - Builds the project for production.
- `npm run start` - Starts the dev server new tab.

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-github-showcases/tree/main/svelte-kit-scss)

The demo application tries to implement some of GitHub's pages and functionality. It uses the OAuth credentials in GitHub to authenticate users with their GitHub accounts and uses svelte's fetch api to fetch data from the GitHub API. Check out the link above to learn more or check out the demo!
