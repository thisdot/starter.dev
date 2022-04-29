# angular-apollo-tailwind starter kit

This starter kit features **Angular**, **Apollo**, and **Tailwind CSS**.

## Overview

### Tech Stack

- [Angular v13.x](https://nextjs.org)
- [Apollo v3.x](https://reactjs.org)
- [Tailwind CSS v3.x](https://tailwindcss.com/)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [Typescript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [Mock Service Worker](https://mswjs.io/) - Mock REST / GraphQL API
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Code

- Angular 'hello world' API endpoint `xx` with corresponding mock located in `xx`.
- Greeting component `xx` that uses Angular Apollo to fetch data from the example hello endpoint.
- An example Counter component `xx`
- Both example components are have co-located tests and stories.

## Installation

### CLI (Recommended)

```bash
npx create-starter-dev
```

- Follow the prompts to select the `angular-apollo-tailwind` starter kit and name your new project.
- `cd` into your project directory and run `yarn`.
- Run `ng serve` to start the development server.
- Open your browser to `http://localhost:4200` to see the included example code running.

### Manual

This requires a download of the entire starter.dev repository and extraction of the `angular-apollo-tailwind` kit from the starters directory.

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/angular-apollo-tailwind` directory to the name of your new project.
- `cd` into your project directory and run `yarn`.
- Run `ng serve` to start the development server.
- Open your browser to `http://localhost:4200` to see the included example code running.

## Commands

- `ng serve` - Starts the development server.
- `ng test` - Runs the unit tests.
- `ng e2e` - Runs end-to-end tests.
- `yarn storybook` - Starts the Storybook UI.
- `yarn lint` - Runs ESLint on the project.
- `yarn prettier` - Formats code for the entire project

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-showcases/tree/main/angular-apollo-tailwind)

The demo for this starter kit is a partial implementation of some GitHub functionality. It uses the xxx library to authenticate users with their GitHub accounts and uses the GitHub GraphQL API with Apollo to fetch data from the GitHub API. Check out the link above to learn more or check out the demo!
