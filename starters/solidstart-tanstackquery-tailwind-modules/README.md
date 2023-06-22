# SolidStart-TanStackQuery-Tailwind-Modules

This starter kit features **SolidStart**, combined with **TanStack Query**, and **Tailwind CSS**, and **CSS Modules**.

## Overview

### Tech Stack

- [SolidStart](https://start.solidjs.com/getting-started/what-is-solidstart/)
- [TanStack Query](https://tanstack.com/query/v4/docs/solid/overview)
- [Tailwind CSS](https://tailwindcss.com/)
- [CSS Modules](https://css-tricks.com/css-modules-part-1-need/)

### Included Tooling

- [Vitest](https://vitest.dev/) - Test runner
- [Storybook](https://storybook.js.org/) - Component library
- [Typescript](https://www.typescriptlang.org/) - Type checking
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Components

#### Counter `src/components/CounterExample`

A small counter example that showcases how to use state in SolidStart. You can view the example on the `src/pages/Counter`.

Signals can live outside of components. Each relevant component subscribes to its value by using it.

#### Fetch `src/components/FetchExample`

Demonstrates how to retrieve data from a third-party API by using `createResource`.

## Installation

This README is written with npm in mind but you can use other manager runners (yarn, pnpm, etc.)

### CLI (Recommended)

```bash
npm create @this-dot/starter -- --kit solidstart-tanstackquery-tailwind-modules
```

- Follow the prompts to select the solidstart-tanstackquery-tailwind-modules starter kit and name your new project.
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:5173` to see the included example code running.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/solidstart-tanstackquery-tailwind-modules` directory to the name of your new project.
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:5173` to see the included example code running.

## Commands

- `dev` - Starts a development server backed by Vite on localhost port 5173 with HMR
- `build` - Builds a production version of the app to deploy
- `start` - Starts the production build with a local version of adapter
- `test` - Runs the test suite
- `storybook` - To showcase the component library
- `lint` - Uses eslint to find potential issues in the codebase
- `lint-fix` - Tries to auto-fix potential issues
- `format` - Fixes formatting issues in the codebase

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-github-showcases/tree/main/solidstart-tanstackquery-tailwind-modules)  

[Live demo](https://solidstart-tanstackquery-tailwind-modules.starter.dev/)

The demo application re-implements some of GitHub's pages and functionality. It uses the OAuth credentials in GitHub to authenticate users with their GitHub accounts and uses window.fetch() to fetch data from the GitHub API. Check out the link above to learn more or check out the demo!