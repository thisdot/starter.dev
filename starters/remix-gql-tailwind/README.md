# remix-gql-tailwind Starter Kit

This starter kit features **Remix**, **GraphQL**, and **Tailwind CSS**.

## Table of Contents

- [Overview](#overview)
  - [Tech Stack](#tech-stack)
  - [Included Tooling](#included-tooling)
  - [Kit Organization / Architecture](#kit-organization-architecture)
  - [Example Components](#example-components)
- [Installation](#installation)
  - [CLI](#cli)
  - [Manual](#manual)
- [Commands](#commands)
- [Demo Implementation](#demo-implementation)

## Overview

### Tech Stack

- [Remix v1.x](https://remix.run/)
- [React v17.x](https://reactjs.org)
- [GraphQL](https://graphql.org/)
- [Tailwind CSS v3.x](https://tailwindcss.com/)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [Vite](https://vitejs.dev/) - Storybook builder

### Kit Organization / Architecture

For this kit, we maintained the [Remix convention](https://remix.run/docs/en/v1/api/conventions) and we do recommend it. For the `app/components` folder, each component is co-located with its tests and stories. This structure makes it easy to find all the code and functionality related to a specific component. Due to Remix's preference for data fetching from the route page, the components are primarily simple view components.

- #### Storybook

  Storybook was introduced because it is really a great tool for testing components in isolation and good for documentation.
  As of [Remix v1.x](https://remix.run/), Storybook isn't supported and doesn't work well with Remix, so [Vite](https://vitejs.dev/) was used in building Storybook to work properly. This might change in the future.

- #### Styling

This kit utilizes Tailwind for styling based on Remix's preference and due to the fact that other CSS libraries such as Styled Components and CSS Modules aren't supported currently. See https://remix.run/docs/en/v1/guides/styling for more information.
The styles are exported from a `<componentName>.classNames.ts` as named exports, this is majorly to avoid [surface styling](https://remix.run/docs/en/v1/guides/styling#surfacing-styles) which can be a bit complex. Also, you could write the Tailwind classes inline but this method is used to keep the file clean and ensure reusability of styles.

If you want to follow this pattern, take a look at our GitHub demo implementation below. Using this structure makes it easy to find all the code and functionality related to a specific component.

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
npm create @this-dot/starter -- --kit remix-gql-tailwind
```

or

```bash
yarn create @this-dot/starter --kit remix-gql-tailwind
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

[Repository](https://github.com/thisdot/starter.dev-github-showcases/tree/main/remix)

The demo application tries to implement some of GitHub's pages and functionality. It uses the OAuth credentials in GitHub to authenticate users with their GitHub accounts and uses graphql-request to fetch data from the GitHub GraphQL API. Check out the link above to learn more or check out the demo!
