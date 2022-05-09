# remix-gql-tailwind starter kit

This starter kit features **Remix**, **GraphQL**, and **Tailwind CSS**.

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

- [Remix v1.x](https://remix.run/)
- [GraphQL](https://graphql.org/)
- [Tailwind CSS v3.x](https://tailwindcss.com/)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [Vite](https://vitejs.dev/) - Storybook builder

### Example Components

In this `remix-gql-tailwind/app/components` directory you will find the `Counter` and `Greeting` directory.

The `Counter` directory contains the following files:

- Counter.stories.tsx
- Counter.classNames.ts
- Counter.test.tsx
- Button.tsx
- Counter.tsx
- index.ts

The `Greeting` directory contains the following files:

- Greeting.stories.tsx
- Greeting.classNames.ts
- Greeting.test.tsx
- Greeting.tsx
- index.ts

## Installation

### CLI (Recommended)

```bash
npx @this-dot/create-starter
```

or

```bash
yarn create @this-dot/starter
```

- Follow the prompts to select the `remix-gql-tailwind` starter kit and name your new project.
- `cd` into your project directory and run `yarn`.
- Run `yarn dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

### Manual

Note: The command below clones the entire repository, including other starter kits.

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/remix-gql-tailwind` directory to the name of your new project.
- `cd` into your project directory and run `yarn`.
- Run `yarn dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

## Commands

- `yarn dev` - Starts the development server.
- `yarn test` - Runs the unit tests.
- `yarn storybook` - Starts the Storybook UI.
- `yarn format` - Formats code with prettier for the entire project.
- `yarn build` - Builds the project for production.
- `yarn start` - Starts the production server.

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-showcases/tree/main/remix)

The demo application tries to implement some of GitHub's pages and functionality. It uses the OAuth credentials in GitHub to authenticate users with their GitHub accounts and uses graphql-request to fetch data from the GitHub Graphql API. Check out the link above to learn more or check out the demo!
