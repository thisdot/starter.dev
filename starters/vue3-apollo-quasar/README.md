# Vue 3 + Apollo + Quasar starter kit

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

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Components

#### File structure

We use multiple files to implement this:

- `.vue` files contain the Vue component (along with its custom CSS whenever applicable and scripts)
- `.spec.ts` files are optional files that contain automated tests for the component. These tests are written to work with Karma and Jasmine.
- `.stories.js|ts` files are optional files containing stories for the component. These files help us visualize the different states the component can have in Storybook.

---

This kit includes 2 components to demonstrate how you can best utilize this kit and its technologies:

- Greeting component `FetchMessage` located in `src/components/FetchMessage/FetchMessage.vue` that uses Vue Apollo to fetch data from the example hello endpoint.

  - Utilizes Vue Apollo to retrieve data from the GraphQL endpoint located at `https://api.starter.dev/graphql`
  - The unit test for the `FetchMessage` component can be found in `tests/unit/FetchMessage.spec.ts`. The tests check that the component:
    - Mounts to the DOM
    - Fetches data from the given GraphQL endpoint
    - Displays the data fetched from the GraphQL endpoint

- Counter component `NumberCounter` located in `src/components/NumberCounter/NumberCounter.vue`
  - The unit test for the `NumberCounter` component can be found in `tests/unit/NumberCounter.spec.ts`. The test checks that the component:
    - Has an increment button
    - Has a decrement button
    - Has a reset button
    - Displays a counter value that starts at 0
    - Increments the counter value by 1 when the increment button is clicked
    - Decrements the counter value by 1 when the increment button is clicked
    - Resets the value of the counter to 0 when the reset button is clicked

### CLI (Recommended)

```bash
npx create-starter-dev
```

- Follow the prompts to select the **vue3-apollo-quasar** kit and name your new project.
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
