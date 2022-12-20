# svelte-kit-scss Starter Kit

This starter kit features **SvelteKit** and **SCSS**

## Table of Contents

- [svelte-kit-scss Starter Kit](#svelte-kit-scss-starter-kit)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Included Tooling](#included-tooling)
  - [Installation](#installation)
    - [CLI (Recommended)](#cli-recommended)
    - [Manual](#manual)
  - [Commands](#commands)
  - [Architecture Decisions](#architecture-decisions)
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
- `cd` into your project directory and run `npm i`.
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

- `npm start` - Starts the dev server new tab.
- `npm run dev` - Starts the development server.
- `npm run build` - Builds the project for production.
- `npm run preview` - Starts a local static web server that serves the files from dist
- `npm test` - Runs the unit tests.
- `npm test:watch` - Runs the unit tests and checks for file changes.
- `npm run test:e2e` - Runs the playwright e2e tests.
- `npm run test:coverage` - Runs the test coverage report
- `npm run check` - Runs Svelte diagnostics
- `npm run check:watch` - Runs Svelte diagnostics and checks for file changes
- `npm run storybook` - Starts the Storybook UI.
- `npm run build-storybook` - Builds the Storybook UI.
- `npm run lint` - Finds problems in your javascript code.
- `npm run format` - Formats code with prettier for the entire project.

## Architecture Decisions

For this kit, we maintained the [SvelteKit Project Structure](https://kit.svelte.dev/docs/project-structure) and we do recommend it. For the `src/lib/components` folder, each component is co-located with its tests and stories. This structure makes it easy to find all the code and functionality related to a specific component. Due to SvelteKit's preference for data fetching from the route page, the components are primarily simple view components.

- Storybook

  Storybook was introduced because it is a great tool for testing components in isolation and good for documentation.

- Styling

  Svelte comes with sass support. Sass is one of the most mature, stable, and powerful professional-grade CSS extension language. It quickly allows us to design robust components.

- Example Components

  In this `svelte-kit-scss/src/lib/components` directory you will find the `Counter` and `Greeting` directory.

  The `Counter` directory contains the following files:

  - Counter.spec.ts
  - Counter.svelte
  - Counter.stories.ts

  The `Greeting` directory contains the following files:

  - Greeting.spec.ts
  - Greeting.svelte
  - Greeting.stories.ts

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-github-showcases/tree/main/svelte-kit-scss)

[Live Application](http://svelte-kit-scss.starter.dev/)

The demo application tries to implement some of GitHub's pages and functionality. It uses the OAuth credentials in GitHub to authenticate users with their GitHub accounts and uses svelte's fetch api to fetch data from the GitHub API. Check out the link above to learn more or check out the demo!
