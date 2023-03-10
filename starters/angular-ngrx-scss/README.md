# angular-ngrx-scss starter kit

This starter kit features Angular 13, NgRx and SCSS.

## Table of Contents

- [Overview](#overview)
  - [Tech Stack](#tech-stack)
  - [Included Tooling](#included-tooling)
  - [Architectural Decisions](#architectural-decisions)
  - [Example Components](#example-components)
- [Installation](#installation)
  - [CLI](#cli-recommended)
  - [Manual](#manual)
- [Commands](#commands)
- [Demo Implementation](#demo-implementation)

## Overview

### Tech Stack

- [Angular](https://angular.io/docs) - JavaScript framework
- [NgRx](https://ngrx.io/docs) - State management library
- [Sass](https://sass-lang.com/) - Styling language

### Included Tooling

- [Karma](https://karma-runner.github.io/latest/index.html) - Test runner
- [Jasmine](https://jasmine.github.io/) - Test framework
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Architectural Decisions

For this kit, we really wanted to showcase how powerful NgRx can be for managing the state of your application. NgRx helps us write actions to trigger state changes, reducers to handle those changes, selectors to grab pieces of state, and effects to communicate with external resources. By doing this, our Angular components can focus on presenting our data instead of needing to understand the logic of how that data is fetched and updated. You can also use the Redux devtools in your browser to help you visualize what your state looks like and how it updates.

One particular decision we made with the fetch example was to put the API call into its own service. We want this kit to be an example of current best practices. As such, it is recommended to keep your http logic separated into its own service that is then called in your effects files. This makes the API logic more straight forward to test and debug, and keeps the effect logic more concise.

### Example Components

In this `starters/angular-ngrx-scss/src/app` directory you will find the `counter-example`, `fetch-example`, `home`, and `state` directories.

The `counter-example`, `fetch-example`, and `home` components are "page" components. The `counter-example` folder also includes a `starter-button` component, which is a re-usable button component tied to that page.

Angular components are split up into multiple files:

- `.html` files contain markup for the component.
- `.scss` files contain scoped styles that will only affect this component thanks to view encapsulation.
- `.ts` files contain TypeScript logic for the component. Not all components actually need logic, but this file is still required as it's where the HTML template and SCSS styles are linked to the component.
- `.spec.ts` files are optional files that contain automated tests for the component. These tests are written to work with Karma and Jasmine.
- `.stories.ts` files are optional files containing stories for the component. These files help us visualize the different states the component can have in Storybook.

The `state` directory is where all of our NgRx logic lives. You'll find a folder for `count` and `greeting`, which relates to the `counter-example` and `fetch-example` components respectively. Each folder contains a file for:

- actions
- reducers
- selectors
- effects
- unit tests for reducers or effects

## Installation

### CLI (Recommended)

```bash
npm create @this-dot/starter -- --kit angular-ngrx-scss
```

or

```bash
yarn create @this-dot/starter --kit angular-ngrx-scss
```

- Follow the prompts to select the `angular-ngrx-scss` starter kit and name your new project.
- `cd` into your project directory and run `yarn`.
- Run `yarn dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/angular-ngrx-scss` directory to the name of your new project.
- `cd` into your project directory and run `yarn`.
- Run `yarn dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

## Commands

- `yarn start` or `yarn dev` - Starts the development server.
- `yarn build` - Builds a compiled version of your app.
- `yarn test` - Runs the unit tests.
- `yarn storybook` - Starts the Storybook UI.
- `yarn lint` - Runs ESLint on the project.
- `yarn prettier` - Formats code for the entire project.

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-github-showcases/tree/main/angular-ngrx-scss)

The demo application re-implements some of GitHub's pages and functionality. It uses the OAuth credentials in GitHub to authenticate users with their GitHub accounts and uses Angular services and NgRx to fetch data from the GitHub API. Check out the link above to learn more or check out the demo!
