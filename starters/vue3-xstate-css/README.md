# Vue 3, XState, and CSS Starter Kit

## Table of contents

<!-- links to each section when done -->

## Overview

### Core Tech Stack

- [Vue 3](https://vuejs.org/)
- [XState](https://xstate.js.org/)

For styling, this kit uses CSS directly. Since we're making use of Vue's single file component structure, we've set our styles to be scoped to each component.

This kit is also set up to show the XState visualizer when run locally, to help you see what your state machines look like and how they work.

### Included Tooling

- [Vite](https://vitejs.dev/) - build / bundle tool
- [Vue Router](https://router.vuejs.org/) - navigation
- [Cypress](https://docs.cypress.io/guides/component-testing/overview) - component / unit testing
- [Storybook](https://storybook.js.org/) - documents component designs
- [ESLint](https://eslint.org/) - code consistency and best practices
- [Prettier](https://prettier.io/) - code formatting

### Type Support for `.vue` Imports in TS

This project is setup to handle TypeScript files. However, TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

## Installation

### CLI (Recommended)

```sh
npm create @this-dot/starter -- --kit vue3-xstate-css
```

or

```sh
yarn create @this-dot/starter --kit vue3-xstate-css
```

- Follow the prompts to select the vue3-xstate-css starter kit and name your new project.
- `cd` into your project directory and run `npm install` or `yarn` to install the dependencies.
- Run `npm run dev` or `yarn dev` to start the development server.
- Open your browser to <http://localhost:5173> to see the included example code running. This will also launch the XState inspector for you.

### Manual

```sh
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the starters/vue3-xstate-css directory to the name of your new project.
- `cd` into your project directory and run `npm install` or `yarn` to install the dependencies.
- Run `npm run dev` or `yarn dev` to start the development server.
- Open your browser to <http://localhost:5173> to see the included example code running. This will also launch the XState inspector for you.

## Available commands

`npm run dev` - starts the local development server

`npm run build-only` - handles compiling and minifying your files
`npm run type-check` - type checks your files
`npm run build` - combines the previous two commands to type-check your files then compile and minify them for production

`npm run preview` - will run the site locally based on your production built files

`npm run test:unit` - runs Cypress component tests in a headless state, as they would run in a CI environment
`npm run test:unit:dev` - runs Cypress component tests in a headed state, so you can walk through individual tests

`npm run lint` - checks your files for common coding errors
`npm run format` - formats all of your files

`npm run storybook` - runs Storybook locally
`npm run build-storybook` - builds a version of your Storybook stories that you can host somewhere

## Kit Organization / Architecture

<!-- a little bit about what the examples are meant to showcase and how the project in general is organized. No specific tree listing, just general idea. any key points about why things were done certain ways should go here. -->
<!-- Project Structure - directory structure to help understand how to extend it -->
<!-- Tech specifics including key details of each tech like config / customizations / important decisions / how to extend the app -->

## Deployment

<!-- instructions for how to deploy this somewhere -->
