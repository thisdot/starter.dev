# nuxt2-pinia-tailwind starter kit

This starter kit features **Nuxt.js 2**, **Pinia**, and **Tailwind CSS**.
## Table of Contents

  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Included Tooling](#included-tooling)
    - [Example Code](#example-code)
  - [Installation](#installation)
    - [CLI (Recommended)](#cli-recommended)
    - [Manual](#manual)
  - [Commands](#commands)

## Overview

### Tech Stack

- [Nuxt.js v2.x](https://nuxtjs.org/)
- [Vue v2.x](https://v2.vuejs.org/)
- [Pinia v2.x](https://pinia.vuejs.org/)
- [Tailwind CSS v3.x](https://tailwindcss.com/)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [Typescript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [Mock Service Worker](https://mswjs.io/) - Mock REST / GraphQL API
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Code

In this `starters/nuxt2-pinia-tailwind` directory you will find the `TheCounter` and `TheGreeting` directories. 

The `TheCounter` directory component uses `Pinia` to control the state of the component. The directory contains the following files:

- TheCounter.stories.ts
- TheCounter.classNames.ts
- TheCounter.test.ts
- TheCounter.vue

The `TheGreeting` directory component uses `@nuxtjs/axios` to fetch data from the example hello endpoint with a corresponding mock located in `test/__mocks__/handlers/greeting.ts`. The directory contains the following files:

- TheGreeting.stories.ts
- TheGreeting.classNames.ts
- TheGreeting.test.ts
- TheGreeting.vue

## Installation

### CLI (Recommended)

```bash
npx create-starter-dev
```

- Follow the prompts to select the `nuxt2-pinia-tailwind` starter kit and name your new project.
- `cd` into your project directory and run `yarn`.
- Run `yarn dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

### Manual

This requires a download of the entire starter.dev repository and extraction of the `nuxt2-pinia-tailwind` kit from the starters directory.

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/nuxt2-pinia-tailwind` directory to the name of your new project.
- `cd` into your project directory and run `yarn`.
- Run `yarn dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

## Commands

- `yarn dev` - Starts the development server.
- `yarn build` - Build and optimize your application with webpack for production.
- `yarn start` - Start the production server (after running nuxt build).
- `yarn generate` - Build the application (if needed), generate every route as a HTML file and statically export to dist/ directory (used for static hosting).
- `yarn test` - Runs the unit tests.
- `yarn stories` - Starts the Storybook UI.
- `yarn lint` - Runs ESLint on the project.
- `yarn lintfix` - Formats code for the entire project using prettier and linter

