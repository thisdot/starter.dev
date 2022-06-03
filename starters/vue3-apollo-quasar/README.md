# Vue 3 Quasar Apollo starter kit

This starter kit features Vue 3, Quasar and Apollo.

## Table of Contents

- [Overview](#overview)
  - [Tech Stack](#tech-stack)
  - [Included Tooling](#included-tooling)
  - [Example Components](#example-components)
- [Installation](#installation)
  - [CLI](#cli)
  - [Manual](#manual)
- [Commands](#commands)
- [Demo Implementation](#demo-implementation)

## Overview

### Tech Stack

- [Vue 3](https://vuejs.org/)
- [Quasar](https://quasar.dev)
- [Apollo (Vue Apollo)](https://apollo.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)

### Included Tooling

- List of tooling used, e.g. jest, Storybook, ESLint, Prettier, etc., with their relevant doc pages linked
- [Jest](https://jestjs.io/) - Test runner
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Components

- Vue 'hello world' API endpoint `https://api.starter.dev/graphql`.
- Greeting component `FetchMessage` located in `src/components/FetchMessage/FetchMessage.vue` that uses Vue Apollo to fetch data from the example hello endpoint.
- An example Counter component `NumberCounter` located in `src/components/NumberCounter/NumberCounter.vue`
- Both example components have co-located tests and stories.

Vue components are split up into multiple files:

- `.ts` files contain TypeScript logic for the component. Not all components actually need logic, but this file is still required as it's where the HTML template and SCSS styles are linked to the component.
- `.spec.ts` files are optional files that contain automated tests for the component. These tests are written to work with Karma and Jasmine.
- `.stories.js|ts` files are optional files containing stories for the component. These files help us visualize the different states the component can have in Storybook.

### CLI (Recommended)

```bash
npx create-starter-dev
```

- Follow the prompts to select the _vue3-apollo-quasar_ kit and name your new project.
- `cd` into your project directory and run `yarn` or `npm install`.
- Run `yarn dev` to start the development server.
- Open your browser to `http://localhost:8080` to see the included example code running.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/vue3-apollo-quasar` directory to the name of your new project.
- `cd` into your project directory and run `yarn` or `npm install`.
- Run `yarn dev` to start the development server.
- Open your browser to `http://localhost:8080` to see the included example code running.

## Commands

#### Install the dependencies

```bash
yarn
# or
npm install
```

#### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
yarn dev
# or
npm run dev
```

#### Lint the files

```bash
yarn lint
# or
npm run lint
```

#### Format the files

```bash
yarn format
# or
npm run format
```

#### Build the app for production

```bash
yarn build
# or
npm run build
```

#### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev/tree/main/starters/vue3-apollo-quasar)
[Live Application](https://vue3-ts-quasar.starter.dev/)
