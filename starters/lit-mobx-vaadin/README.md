## Lit-Mobx-Vaadin Starter Kit

This starter kit features Lit, Mobx and Vaadin elements.

## Table of Contents

- [Overview](#overview)
  - [Tech Stack](#tech-stack)
  - [Included Tooling](#included-tooling)
  - [Example Components](#example-components)
- [Installation](#installation)
  - [CLI](#cli-recommended)
  - [Manual](#manual)
- [Commands](#commands)

## Overview

### Tech Stack

- [Lit](https://lit.dev/) - JavaScript framework for writing web components
- [Mobx](https://mobx.js.org/) - State management library
- [Vaadin](https://vaadin.com/components) - Routing and UI components

### Included Tooling

- [Playwright](https://playwright.dev/) - Testing library
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Components

In the `starters/lit-mobx-vaadin/src` directory you will find a few directories organizing the project. Files are organized in directories under `src` as such:

- `api` - contains functions that can be used to contact the Starter.dev API
- `components` - contains re-usable components used inside of the project
- `pages` - contains page components that are rendered when certain routes are visited
- `styles` - contains stylsheets used by multiple components

## Installation

### CLI (Recommended)

```bash
npm create @this-dot/starter -- --kit lit-mobx-vaadin
```

or

```bash
yarn create @this-dot/starter --kit lit-mobx-vaadin
```

- Follow the prompts to select the `lit-mobx-vaadin` starter kit and name your new project.
- `cd` into your project directory and run `yarn`.
- Run `yarn start` to start the development server.
- Open your browser to `http://localhost:8000` to see the included example code running.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/lit-mobx-vaadin` directory to the name of your new project.
- `cd` into your project directory and run `yarn`.
- Run `yarn start` to start the development server.
- Open your browser to `http://localhost:8000` to see the included example code running.

## Commands

- `yarn start` or `yarn dev` runs your app for development, reloading on file changes
- `yarn start:build` runs your app after it has been built using the build command
- `yarn build` builds your app and outputs it in your `dist` directory
- `yarn test` runs your test suite with Web Test Runner
- `yarn storybook` - Starts the Storybook UI.
- `yarn lint` runs the linter for your project
- `yarn prettier` - Formats code for the entire project.
