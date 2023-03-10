# expo-zustand-styled-components starter kit

This starter kit features **Expo**, combined with **Zustand**, and **Styled-components**

- [expo-zustand-styled-components starter kit](#expo-zustand-styled-components-starter-kit)
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
  - [Demo Implementation](#demo-implementation)

## Overview

### Tech Stack

- [React v18.x](https://reactjs.org)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [styled-components](https://styled-components.com/)
- [Zustand](https://github.com/pmndrs/zustand)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Components

- Home page `src/screens/Home/Home.tsx` with a counter component and a button to navigate to the about page.
- About page `src/screens/About/About.tsx` with a button to navigate back to the home page.
- An example Button component `src/components/Button/Button.tsx`

In this `starters/expo-zustand-styled-components/src` directory you will find the screens and components directories. The `screens` directory contains the following files:

- Home/index.ts
- Home/Home.tsx
- Home/Home.styles.tsx
- Home/useCounter.ts

- About/index.ts
- About/About.tsx
- About/About.styles.tsx

The `Button` directory contains the following files:

- Button.styles.tsx
- Button.test.tsx
- Button.tsx
- index.ts

## Installation

### CLI (Recommended)

```bash
npm create @this-dot/starter -- --kit expo-zustand-styled-components
```

or

```bash
yarn create @this-dot/starter --kit expo-zustand-styled-components
```

- Follow the prompts to select the `expo-zustand-styled-components` starter kit and name your new project.
- `cd` into your project directory and run `npm install`.
- Run `npm run start` to start the development server.
- Press `i` to open the iOS simulator or `a` to open the Android simulator.
- Press `w` to open the web browser.
- Open your browser to `http://localhost:19006` to see the included example code running.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/expo-zustand-styled-components` directory to the name of your new project.
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

## Commands

- `npm run start` - Starts the development server.
- `npm run test` - Runs the unit tests.
- `npm run ios` - Runs the app in the iOS simulator.
- `npm run android` - Runs the app in the Android simulator.
- `npm run web` - Runs the app in the web browser.

## Kit Organization / Architecture

The demo components included in the starter.kit are co-located with the tests. If you want to follow this pattern, take a look at our GitHub demo implementation below. The demo implementation is done with the same structure but includes things like tests, styles, and view components that are modeled after an MVC type architecture. Using this structure makes it easy to find all the code and functionality related to a specific component.

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-github-showcases/tree/main/expo-zustand-styled-components)

The demo application re-implements some of GitHub's pages and functionality. It uses the OAuth credentials in GitHub to authenticate users with their GitHub accounts and uses RxJS to fetch data from the GitHub API. Check out the link above to learn more or check out the demo!
