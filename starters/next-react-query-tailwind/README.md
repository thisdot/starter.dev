# next-react-query-tailwind starter kit

This starter kit features **Next.js**, **React Query**, and **Tailwind CSS**.

## Overview

### Tech Stack

- [Next.js v12.x](https://nextjs.org)
- [React v17.x](https://reactjs.org)
- [React Query v3.x](https://react-query.tanstack.com/)
- [Tailwind CSS v3.x](https://tailwindcss.com/)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [Typescript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [Mock Service Worker](https://mswjs.io/) - Mock REST / GraphQL API
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Code

- Next.js 'hello world' API endpoint `pages/api/hello.ts` with corresponding mock located in `msw/handlers/helloMock.ts`.
- Greeting component `components/Greeting.tsx` that uses React Query to fetch data from the example hello endpoint.
- An example Counter component `components/Counter.tsx`
- Both example components are have co-located tests and stories.

## Installation

### CLI (Recommended)

```bash
npx create-starter-dev
```

- Follow the prompts to select the `next-react-query-tailwind` starter kit and name your new project.
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

### Manual

This requires a download of the entire starter.dev repository and extraction of the `next-react-query-tailwind` kit from the starters directory.

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/next-react-query-tailwind` directory to the name of your new project.
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

[Repository](https://github.com/thisdot/starter.dev-showcases/tree/main/next-react-query-tailwind)

The demo for this starter kit is a partial implementation of some GitHub functionality. It uses the NextAuth library to authenticate users with their GitHub accounts and uses the GitHub GraphQL API with codegen and React Query to fetch data from the GitHub API. Check out the link above to learn more or check out the demo!
