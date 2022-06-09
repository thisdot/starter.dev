# cra-rxjs-styled-components starter kit

This starter kit features Create React App, RxJS and styled-components.

## Table of Contents

- [cra-rxjs-styled-components starter kit](#cra-rxjs-styled-components-starter-kit)
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

- [React v17.x](https://reactjs.org)
- [React Router](https://reactrouter.com/)
- [RxJS](https://rxjs.dev/)
- [styled-components](https://styled-components.com/)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Components

- React 'hello world' API endpoint `https://api.starter.dev/hello` with corresponding mock located in `src/components/RXJS-Example/RXJS-Example.test.tsx`.
- Greeting component `src/components/RXJS-Example/RXJS-Example.test.tsx` that uses `rxjs/fetch` to fetch data from the example hello endpoint.
- An example Counter component `src/components/Counter/Counter.tsx`
- Both example components have co-located tests and stories.

In this `starters/cra-rxjs-styled-components/src` directory you will find the `Counter`, `RxJS-Example`, and `Homepage` directories.

The `Counter` directory contains the following files:

- Counter.stories.tsx
- Counter.styles.tsx
- Counter.test.tsx
- Counter.tsx
- index.ts

The `RxJS-Example` directory contains the following files:

- RxJS-Example.stories.tsx
- RxJS-Example.styles.tsx
- RxJS-Example.test.tsx
- RxJS-Example.tsx
- index.ts

The `Homepage` directory contains the following files:

- Homepage.stories.tsx
- Homepage.styles.tsx
- Homepage.test.tsx
- Homepage.tsx
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

- Follow the prompts to select the `cra-rxjs-styled-components` starter kit and name your new project.
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/cra-rxjs-styled-components` directory to the name of your new project.
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

## Commands

- `npm run dev` - Starts the development server.
- `npm run test` - Runs the unit tests.
- `npm run storybook` - Starts the Storybook UI.
- `npm run lint` - Runs ESLint on the project.
- `npm run prettier` - Formats code for the entire project


## Kit Organization / Architecture

The demo components included in the starter.kit are co-located with the tests and stories. If you want to follow this pattern, take a look at our GitHub demo implementation below. The demo implementation is done with the same structure but includes things like tests, styles, and view components that are modeled after an MVC type architecture. Using this structure makes it easy to find all the code and functionality related to a specific component.

### Example directory

```
- UserRepos.test.tsx - Unit tests for the UserRepos component
- UserRepos.stories.tsx - Storybook UI for the UserRepos component
- UserRepos.styles.tsx - Styled Component for UserRepos component styling
- UserRepos.tsx - View component for the UserRepos component
```

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-showcases/tree/main/cra-rxjs-styled-components)

The demo application re-implements some of GitHub's pages and functionality. It uses the OAuth credentials in GitHub to authenticate users with their GitHub accounts and uses RxJS to fetch data from the GitHub API. Check out the link above to learn more or check out the demo!
