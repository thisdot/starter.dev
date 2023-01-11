# nuxt3-pinia-vuetify starter kit

This starter kit features **Nuxt.js 3**, **Pinia**, and **Vuetify**.

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

- [Nuxt.js v3.x](https://nuxtjs.org/)
- [Vue v3.x](https://vuejs.org/)
- [Pinia v2.x](https://pinia.vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)

### Included Tooling

- [Vitest](https://vitest.dev/) - Test runner
- [Typescript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [ESLint](https://eslint.org/) - Code linting

### Example Code

In this `starters/nuxt3-pinia-vuetify` directory you will find the `CounterExample` and `FetchExample` directories in the components.

The `CounterExample` directory component uses `Pinia` to control the state of the component. The directory contains the following files:

- CounterExample.stories.ts
- CounterExample.test.ts
- CounterExample.vue

The `FetchExample` directory component uses `useFetch` to fetch data from the example hello endpoint`. The directory contains the following files:

- FetchExample.stories.ts
- FetchExample.test.ts
- FetchExample.vue

## Installation

### CLI (Recommended)

```bash
npm create @this-dot/starter -- --kit nuxt3-pinia-vuetify
```

or

```bash
yarn create @this-dot/starter --kit nuxt3-pinia-vuetify
```

- Follow the prompts to select the `nuxt3-pinia-vuetify` starter kit and name your new project.
- `cd` into your project directory and run `yarn`.
- Run `yarn dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

### Manual

This requires a download of the entire starter.dev repository and extraction of the `nuxt3-pinia-vuetify` kit from the starters directory.

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/nuxt3-pinia-vuetify` directory to the name of your new project.
- `cd` into your project directory and run `yarn`.
- Run `yarn dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

## Commands

- `yarn dev` - Starts the development server.
- `yarn build` - Build and optimize your application with webpack for production.
- `yarn preview` - Start the server (after running nuxt build).
- `yarn generate` - Build the application (if needed), generate every route as a HTML file and statically export to dist/ directory (used for static hosting).
- `yarn test` - Runs the unit tests.
- `yarn storybook` - Starts the Storybook UI.
- `yarn lint` - Runs ESLint on the project.
- `yarn lint-fix` - Formats code for the entire project using prettier and linter
