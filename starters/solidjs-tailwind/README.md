# SolidJS and Tailwind starter kit

This starter kit features SolidJS combined with Tailwind CSS.

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

This starter kit features two of the hottest frameworks in the JavaScript and CSS ecosystems. SolidJS is a new framework built on top of the React API and offers a leaner and more performant alternative to React. Tailwind CSS is a utility-first CSS framework that offers a lot of flexibility and is easy to use. It is also very performant and offers a lot of customization options. This starter kit combines both frameworks to offer a lean and performant setup.

[View the kit on Github](https://github.com/thisdot/starter.dev/tree/main/starters/solidjs-tailwind)

### Tech Stack

- [SolidJS](https://www.solidjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### Included Tooling

- [Vitest](https://vitest.dev/) - Test runner
- [Storybook](https://storybook.js.org/) - Component library
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## Installation

This README is written with pnpm in mind but you can use other manager runner 

### CLI (Recommended)

```bash
npm i -g pnpm
pnpm create @this-dot/starter --kit solidjs-tailwind
```

- Follow the prompts to select the SolidJS and TailwindCSS starter kit and name your new project.
- `cd` into your project directory and run `pnpm install`.
- Run `pnpm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/solidjs-tailwind` directory to the name of your new project.
- `cd` into your project directory and run `pnpm install`.
- Run `pnpm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

## Commands

- `dev` - Runs the development server on localhost port 3000 with HMR
- `test` - Runs the test suite
- `storybook` - To showcase the component library
- `build` - Builds a production version of the app to deploy
- `serve` - Serves a production build on localhost port 4173
- `lint` - Uses eslint to find potential issues in the codebase
- `lint-fix` - Tries to auto-fix potential issues
- `format` - Fixes formatting issues in the codebase

### Architectural Decisions

#### State management

Managing the state between components is a big part of creating modern web applications. Typically, this is done by using a third-party package. Sometimes it can be combined with fetching server data (e.g., Apollo or Tanstack Query).

So, we investigated two options which are:

- **Tanstack Query** - Used in other starter kits and offers a lean setup combining state and server communication
- **createResource** - Built-in SolidJS and offers a similar experience to Tanstack Query

Having weighed out some pros and cons, we opted out for SolidJS' native `createResource` as it comes with bundles and is the "solid way" of handling things.

### Example Components

#### Counter `src/components/CounterExample`

A small counter example that showcases how to use state in SolidJS. You can view the example on the `src/pages/Counter`.

Signals can live outside of components. Each relevant component subscribes to its value by using it.

#### Fetch `src/components/FetchExample`

Demonstrates how to retrieve data from a third-party API by using `createResource`.

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-github-showcases/tree/main/solidjs-tailwind)  
[Live demo](https://solidjs-tailwind.starter.dev/)

[Live demo](https://solidjs-tailwind.starter.dev/)

The demo application re-implements some of GitHub's pages and functionality. It uses the OAuth credentials in GitHub to authenticate users with their GitHub accounts and uses window.fetch() to fetch data from the GitHub API. Check out the link above to learn more or check out the demo!
