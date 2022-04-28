# angular-ngrx-scss starter kit

This starter kit features Angular 13, NgRx and SCSS.

## Table of Contents

- [Overview](#overview)
  - [Tech Stack](#tech-stack)
  - [Included Tooling](#included-tooling)
  - [Architectural Decisions](#architectural-decisions)
  - [Example Components](#example-components)
- [Installation](#installation)
  - [CLI](#cli)
  - [Manual](#manual)
- [Commands](#commands)
- [Demo Implementation](#demo-implementation)

## Overview

### Tech Stack

- List of technologies used with links to relevant doc pages

### Included Tooling

- List of tooling used, e.g. jest, Storybook, ESLint, Prettier, etc., with their relevant doc pages linked
- [Karma](https://karma-runner.github.io/latest/index.html) - Test runner
- [Jasmine](https://jasmine.github.io/) - Test framework
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Sass](https://sass-lang.com/) - CSS extension language
- [Storybook](https://storybook.js.org/) - Component library
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Architectural Decisions

Components are split up into re-usable "dumb" components and page components. State management is done primarily using NgRx. Network request handling and all changes to application state are done through NgRx actions. This is done so that we can have a unidirectional data flow that's easy to reason about and reduces the cognitive overhead encountered when working in the project. NgRx when paired with the Redux devtools makes for an easier debugging experience overall as well.

### Example Components

In this `starters/angular-ngrx-scss/src` directory you will find the `home`, `starter-button`, `button-example`, `fetch-example` and `state` directories.

`home`, `button-example` and `fetch-example` are all "page" components and are referenced in `app-routing.module.ts` for routing different URLs to different components. The `starter-button` component is a re-usable component used by the `button-example` page, and is nested under its directory. The `state` directory is not for a component, but instead contains everything we need to manage the state of the application. It has all of our NgRx actions, reducers, selectors and effects.

Components are split up into an `.html` files, `.scss` files, `.ts` files and `.spec.ts` files:

- `.html` files contain our markup for the components.
- `.scss` files contain styles for our component that will only affect our components thanks to view encapsulation.
- `.ts` files contain TypeScript logic for the components. Not all components actually need logic, but this file is still required as it's where the HTML template and SCSS styles are linked to the component.
- `.spec.ts` are optional files that contain automated tests for the component. These tests are written to work with Karma and Jasmine.

## Installation

### CLI (Recommended)

```bash
npx create-starter-dev
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
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

## Commands

- List of helpful package.json scripts and their purpose

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-showcases/tree/main/angular-ngrx-scss)

The demo application re-implements some of GitHub's pages and functionality. It uses the OAuth credentials in GitHub to authenticate users with their GitHub accounts and uses RxJS to fetch data from the GitHub API. Check out the link above to learn more or check out the demo!
