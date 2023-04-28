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

- [Typescript](https://www.typescriptlang.org/) - Type checking
- [ESLint](https://eslint.org/) - Code linting

> **Note**: We didn't include Storybook in this starter kit because it is not yet compatible with Nuxt.js 3. We will add it back in when it is. Likewise we didn't include tests because the testing story for Nuxt.js 3 is still being worked out and are not production ready.

### Example Code

In this `starters/nuxt3-pinia-vuetify` directory you will find the `CounterExample` and `FetchExample` directories in the components.

The `CounterExample` directory component uses `Pinia` to control the state of the component. The directory contains the following files:

- CounterExample.vue

The `FetchExample` directory component uses `useLazyFetch` to fetch data from the example `hello endpoint`. The directory contains the following files:

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

- `yarn dev` / `yarn start` - Starts the development server.
- `yarn build` - Creates a `.output` directory with all your application, server and dependencies ready for production.
- `yarn preview` - Starts a server to preview your Nuxt application after running the build command.
- `yarn generate` - Pre-renders every route of your application and stores the result in plain HTML files that you can deploy on any static hosting services. The command triggers the `nuxi build` command with the `prerender` argument set to `true`
- `yarn postinstall` - Creates a `.nuxt` directory in your application and generates types. This can be useful in a CI environment or as a `postinstall` command in your `package.json`.
- `yarn lint:js` - Runs ESLint on the project.
- `yarn lint:prettier` - Runs Prettier on the project.
- `yarn lint` - Runs both `yarn lint:js` and `yarn lint:prettier`.
- `yarn lint:fix` - Runs ESLint and Prettier on the project and fixes any errors.
