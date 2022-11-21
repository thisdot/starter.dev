# express-typescript starter kit

This starter kit features Express, Typescript API setup

## Table of Contents

- [express-typescript starter kit](#express-typescript-starter-kit)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Included Tooling](#included-tooling)
    - [Example Components](#example-components)
  - [Installation](#installation)
    - [CLI (Recommended)](#cli-recommended)
    - [Manual](#manual)
  - [Commands](#commands)
  - [Kit Organization / Architecture](#kit-organization--architecture)
    - [Example directory](#example-directory)
  - [Demo Implementation](#demo-implementation)

## Overview

### Tech Stack

- [Express v4](https://expressjs.com)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [Supertest](https://www.npmjs.com/package/supertest) - API testing
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Controllers

TODO: set up example controllers

## Installation

### CLI (Recommended)

```bash
npm create @this-dot/starter --kit express-typescript
```

or

```bash
yarn create @this-dot/starter --kit express-typescript
```

- Follow the prompts to select the `express-typescript` starter kit and name your new project.
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/express-typescript` directory to the name of your new project.
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3333` to see the included example code running.

## Commands

- `npm run dev` - Starts the development server.
- `npm run test` - Runs the unit tests.
- `npm run test:e2e` - Runs the supertest API tests.
- `npm run lint` - Runs ESLint on the project.
- `npm run format` - Formats code for the entire project

## Kit Organization / Architecture

The demo components included in the starter.kit are co-located with the tests and stories. If you want to follow this pattern, take a look at our GitHub demo implementation below. The demo implementation is done with the same structure but includes things like tests, routes, and controllers that are modeled after best practices. Using this structure makes it easy to find all the code and functionality that are related.

### Example directory

```

TODO: example
```

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-showcases/tree/main/express-typescript)

TODO: what does the the demo implementation do.
