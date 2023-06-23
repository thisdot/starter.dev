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
npm create @this-dot/starter -- --kit next-react-query-tailwind
```

or

```bash
yarn create @this-dot/starter --kit next-react-query-tailwind
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

## Kit Organization / Architecture

The demo components included in the starter.kit are co-located with the tests and stories. If you want to follow this pattern, take a look at our GitHub demo implementation below. The demo implementation is done with the same structure but includes things like mocks, styles, and data fetching components that are modeled after an MVC type architecture. Using this structure makes it easy to find all the code and functionality related to a specific component. This pattern follows the single responsibility principle since each file has one purpose. For example the `.data.tsx` Components handle data all the functionality related to data fetching for your component like network requests, pending states, and marshalling into a consumable format for your `.view.tsx` file that is responsible for just the UI representation of that data.

### Example directory

```
- UserRepos.test.tsx - Unit tests for the UserRepos component
- UserRepos.stories.tsx - Storybook UI for the UserRepos component
- UserRepos.mocks.tsx - Mock response for the UserRepos query
- UserRepos.query.tsx - GraphQL query for the UserRepos component
- UserRepos.data.tsx - Data fetching component for the UserRepos component
- UserRepos.view.tsx - View component for the UserRepos component
- UserRepos.module.css - CSS module for UserRepos component
```

### Mock Service Worker (MSW)

Mock Service Worker makes it easy to write tests or stories for Components or files that depend on network requests. It allows you to mock responses for any requests that you test depends on and when your tests are running it will intercept network requests and return the mock data you provided. We use the `.mock.ts` files to define our mock responses in our GitHub demo implementation. It can also be used to develop your app offline.

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-github-showcases/tree/main/next-react-query-tailwind)

[Live Application](https://next-react-query-tailwind.starter.dev/)

The demo for this starter kit is a partial implementation of some GitHub functionality. It uses the NextAuth library to authenticate users with their GitHub accounts and uses the GitHub GraphQL API with codegen and React Query to fetch data from the GitHub API. Check out the link above to learn more or check out the demo!
