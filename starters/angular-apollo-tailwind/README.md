# angular-apollo-tailwind starter kit

This starter kit features **Angular 13**, **Apollo** and **Tailwind CSS**.

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

- [Angular v13.x](https://angular.io/docs)
- [Apollo v3.x](https://apollo-angular.com)
- [Tailwind CSS v3.x](https://tailwindcss.com/)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [Typescript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [Mock Service Worker](https://mswjs.io/) - Mock REST / GraphQL API
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Components

- Angular 'hello world' API endpoint `https://api.starter.dev/graphql` with corresponding mock located in `fetch-example.component.spec.ts`.
- Greeting component `app-fetch-example` that uses Angular Apollo to fetch data from the example hello endpoint.
- An example Counter component `app-counter-example`
- Both example components have co-located tests and stories.

Angular components are split up into multiple files:

- `.html` files contain markup for the component.
- `.scss` files contain scoped styles that will only affect this component thanks to view encapsulation.
- `.ts` files contain TypeScript logic for the component. Not all components actually need logic, but this file is still required as it's where the HTML template and SCSS styles are linked to the component.
- `.spec.ts` files are optional files that contain automated tests for the component. These tests are written to work with Karma and Jasmine.
- `.stories.ts` files are optional files containing stories for the component. These files help us visualize the different states the component can have in Storybook.

## Installation

### CLI (Recommended)

```bash
npx @this-dot/create-starter
```

or

```bash
yarn create @this-dot/starter
```

- Follow the prompts to select the `angular-apollo-tailwind` starter kit and name your new project.
- `cd` into your project directory and run `yarn`.
- Run `yarn start` to start the development server.
- Open your browser to `http://localhost:4200` to see the included example code running.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/angular-apollo-tailwind` directory to the name of your new project.
- `cd` into your project directory and run `yarn`.
- Run `yarn start` to start the development server.
- Open your browser to `http://localhost:4200` to see the included example code running.

## Commands

- `yarn start` - Starts the development server.
- `yarn build` - Builds a compiled version of your app.
- `yarn test` - Runs the unit tests.
- `yarn storybook` - Starts the Storybook UI.
- `yarn lint` - Runs ESLint on the project.
- `yarn prettier` - Formats code for the entire project

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-github-showcases/tree/main/angular-apollo-tailwind)

[Live Application](http://angular-apollo-tailwind.starter.dev/)
