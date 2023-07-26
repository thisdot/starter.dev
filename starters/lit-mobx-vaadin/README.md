## Lit-Mobx-Vaadin Starter Kit

This starter kit features Lit, Mobx and Vaadin elements.

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

## Getting Started

### Prerequisites
* Node.js 16.8 or later installed

### Development
- We recommend using the starter.dev CLI to create your own copy of this kit.
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

### Example Components

In the `starters/lit-mobx-vaadin/src` directory you will find a few directories organizing the project. Files are organized in directories under `src` as such:

- `api` - contains functions that can be used to contact the Starter.dev API
- `components` - contains re-usable components used inside of the project
- `pages` - contains page components that are rendered when certain routes are visited
- `styles` - contains stylesheets used by multiple components

## Available Commands

- `yarn start` or `yarn dev` runs your app for development, reloading on file changes
- `yarn start:build` runs your app after it has been built using the build command
- `yarn build` builds your app and outputs it in your `dist` directory
- `yarn test` runs your test suite with Web Test Runner
- `yarn test:integration` runs your test suite with Playwright
- `yarn storybook` - Starts the Storybook UI.
- `yarn storybook:build` - build Storybook as a static web application
- `yarn lint` - runs the linter for your project
- `yarn prettier` - Formats code for the entire project.
- `yarn analyze` - generate manifest for web components

## Project Details
### Kit Organization / Architecture
Routing for this kit is handled by [Vaadin Router](https://github.com/vaadin/router)

UI Components are located inside the `src/components` folder. The extended/overridden Vaadin components have their own dedicated folder. Make sure to import these components from this folder and not directly from the installed module.

Pages are located inside `src/pages`. Each one represents a route. These pages have some shared styles defined in the `PageMixin`. This mixin can be extended if shared functionality between pages is required.

### Styling and Theme
The project uses Vaadin Components as the main component framework. Usage of CSS variables is encouraged for theming. The default "Lumo" theme has been extended with some custom variables.

## Deployment
The `build` command creates a working app using web components, so you can deploy it to any hosting provider that supports a static site.