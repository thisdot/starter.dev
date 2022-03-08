# cra-rxjs-styled-components starter kit

This starter kit features Create React App, RxJS and styled-components.

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

- [React v17.x](https://reactjs.org)
- [RxJS](https://rxjs.dev/)
- [styled-components](https://styled-components.com/)

### Included Tooling

- Jest - Test runner
- Typescript - Type checking
- React Router - Creating routes
- Storybook - Component library
- ESLint - Code linting
- Prettier - Code formatting

### Example Components

In this `starters/cra-rxjs-styled-components/src` directory you will find the `Counter` and `Homepage` directories.

The `Counter` contains the following files:

- Counter.stories.tsx
- Counter.styles.tsx
- Counter.test.tsx
- Counter.tsx
- index.ts

The `Homepage` contains the following files:

- Homepage.stories.tsx
- Homepage.styles.tsx
- Homepage.test.tsx
- Homepage.tsx
- index.ts

## Installation

### CLI (Recommended)

```bash
npm init starter-dev
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

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-showcases/tree/main/cra-rxjs-styled-components)

The demo application re-implements some of GitHub's pages and functionality. It uses the OAuth credentials in GitHub to authenticate users with their GitHub accounts and uses RxJS to fetch data from the GitHub API. Check out the link above to learn more or check out the demo!
