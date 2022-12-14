# nextjs12-routing-chakra-ui starter kit

This starter kit features **Next.js v12** and **Chakra UI**.

## Table of Contents

- [Overview](#overview)
  - [Tech Stack](#tech-stack)
  - [Included Tooling](#included-tooling)
  - [Unit testing](#unit-testing)
  - [Storybook's Accessibility testing](#storybooks-accessibility-testing)
  - [Chakra UI's Customizable theme](#chakra-uis-customizable-theme)
  - [Example Components](#example-components)
    - [API routes example](#api-routes-example)
    - [Counter Example](#counter-example)
    - [Fetch example](#fetch-example)
- [Installation](#installation)
  - [CLI (Recommended)](#cli-recommended)
  - [Manual](#manual)
- [Commands](#commands)
- [Kit Organization / Architecture](#kit-organization--architecture)

## Overview

### Tech Stack

- [Next.js 12](https://nextjs.org/blog/next-12)
- [Chakra UI](https://chakra-ui.com/)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Unit testing

All of the unit tests for this kit can be found in the `__tests__` directory.

```
.
├── __tests__
│   ├── counter-example.test.tsx
│   ├── fetch-example.test.tsx
│   └── index.test.tsx
```

### Storybook's Accessibility testing

This starter kit comes with the `@storybook/addon-a11y` which is used to check for common accessibility errors in your components. When you run `yarn run storybook`, each story will show detailed explanations with suggested fixes if errors are found.

### Chakra UI's Customizable theme

Inside the `src/pages/_app.tsx` directory, you will find the basic setup for customizing your theme, colors, and font styles using Chakra UI.

```js
const colors = {
  brand: {
    50: "#1a365d",
    100: "#153e75",
    500: "#2464ec",
  },
};

const fontWeights = {
  normal: 400,
  medium: 600,
  bold: 800,
};

const theme = extendTheme({ colors, fontWeights });
```

### Example Components

#### API routes example

Inside the `src/pages/api` directory, you will find a `hello.ts` file which includes an example on how to create your own API's with Next.js 12.

```js
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "This Dot Labs" });
}
```

#### Counter Example

Inside the `src/pages/counter-example` directory, you will find the counter-example `index.tsx` and `counter.stories.tsx` files. In this example, you will see how to work with Chakra UI components in Next.js 12. You will also see examples on how to write stories for your components using Storybook.

#### Fetch example

Inside the `src/pages/fetch-example` directory, you will find the fetch example `[[...slug]].tsx` and `fetch.stories.tsx` files. This example will show you how to work with a REST API and `getServerSideProps`.You will also see examples on how to write stories for your components using Storybook.

```js
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;

  const res = await fetch(
    `https://api.starter.dev/.netlify/functions/server/hello?greeting=from ${checkSlugType(
      slug
    )}!`
  );
  const userStr = await res.text();

  return {
    props: { userStr },
  };
};
```

## Installation

### CLI (Recommended)

```bash
npm create @this-dot/starter --kit next12-routing-chakra-ui
```

or

```bash
yarn create @this-dot/starter --kit next12-routing-chakra-ui
```

- Follow the prompts to select the `next12-routing-chakra-ui` starter kit and name your new project.
- `cd` into your project directory and run `yarn install`.
- Run `yarn run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

### Manual

This requires a download of the entire starter.dev repository and extraction of the `next12-routing-chakra-ui` kit from the starters directory.

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/next12-routing-chakra-ui` directory to the name of your new project.
- `cd` into your project directory and run `yarn install`.
- Run `yarn run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

## Commands

- `yarn run dev` - Starts the development server.
- `yarn run test` - Runs the unit tests.
- `yarn run storybook` - Starts the Storybook UI.
- `yarn run lint` - Runs ESLint on the project.
- `yarn run format:fix` - Formats code for the entire project

## Kit Organization / Architecture

At the root level, you will find all of the testing, linting, Prettier, Storybook and TypeScript configurations along with the `src` and `public` directories.

Inside the `src` directory, you will find the following structure:

```
.
├── components
│   └── greeting
│       └── index.tsx
└── pages
    ├── api
    │   └── hello.ts
    ├── counter-example
    │   ├── counter.stories.tsx
    │   └── index.tsx
    ├── fetch-example
    │   ├── [[...slug]].tsx
    │   └── fetch.stories.tsx
    ├── _app.tsx
    └── index.tsx
```
