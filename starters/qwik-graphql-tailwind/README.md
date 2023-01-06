# qwik-graphql-tailwind kit

This starter kit features **Qwik**, **GraphQL** and **Tailwind CSS**.

## Table of Contents

- [Overview](#overview)
  - [Tech Stack](#tech-stack)
  - [Included Tooling](#included-tooling)
  - [Example Components](#example-components)
- [Installation](#installation)
  - [CLI](#cli-recommended)
  - [Manual](#manual)
- [Commands](#commands)
- [Demo Implementation](#demo-implementation)

## Overview

### Tech Stack

- [Qwik](https://qwik.builder.io/)
- [GraphQL](https://graphql.org/)
- [Tailwind CSS v3.x](https://tailwindcss.com/)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [Typescript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [Mock Service Worker](https://mswjs.io/) - Mock REST / GraphQL API
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Components

In this `starters/qwik-graphql-tailwind/src/routes` directory you will find the `home`, `counter` and `data-fetching` directories.

- `src/routes`: Provides the directory based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

## Installation

### CLI (Recommended)

```bash
npm create @this-dot/starter -- --kit qwik-graphql-tailwind
```

or

```bash
yarn create @this-dot/starter --kit qwik-graphql-tailwind
```

- Follow the prompts to select the `qwik-graphql-tailwind` starter kit and name your new project.
- `cd` into your project directory and run `yarn`.
- Run `yarn start` to start the development server.
- Open your browser to `http://localhost:5173` to see the included example code running.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/qwik-graphql-tailwind` directory to the name of your new project.
- `cd` into your project directory and run `yarn`.
- Run `yarn start` to start the development server.
- Open your browser to `http://localhost:5173` to see the included example code running.

## Commands

- `yarn start` - Starts the development server.
- `yarn dev` - Equivalent to `yarn start`, but uses `127.0.0.1` instead of `localhost` when opening browser.
- `yarn dev.debug` - Attaches [Node.js inspector](https://nodejs.org/en/docs/inspector).
- `yarn build` - Builds a compiled production version of your app. Equivalent to `yarn qwik build`.
- `yarn build.client` - Builds a compiled production version of your app without building types and running linting.
- `yarn build.types` - Runs tsc compiler.
- `yarn preview` - Builds your app and serves in in production mode on a local vite preview server.
- `yarn build.preview` - Builds your app in production mode to be used with vite preview server.
- `yarn qwik` - Invokes the Qwik CLI. Possible arguments:
  - `add` - Add an integration to your app.
  - `build` - Builds your app in production mode.
  - `build preview` - Same as `build` but for preview server.
- `yarn test` - Runs the unit tests.
- `yarn test.coverage` - Runs the unit tests and generates a coverage report.
- `yarn storybook` - Starts the Storybook UI.
- `yarn build-storybook` - Builds storybook instance to `storybook-static` folder.
- `yarn lint` - Runs ESLint on the project.
- `yarn prettier` - Formats code for the entire project.
- `yarn prettier.check` - Checks all project code to conform to prettier rules.

### Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-github-showcases/tree/main/qwik-graphql-tailwind)

The demo application re-implements some of GitHub's pages and functionality. It uses the OAuth credentials in GitHub to authenticate users with their GitHub accounts and uses QraphQL to fetch data from the GitHub API. Check out the link above to learn more or check out the demo!

