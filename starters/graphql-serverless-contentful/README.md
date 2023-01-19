# serverless-framework-apollo-contentful starter kit

This starter kit features **Serverless**, **GraphQL**, **Apollo Server**, and **Contentful**.

## Overview

### Tech Stack

- [GraphQL](https://graphql.org/)
- [Apollo Server v4.x](https://www.apollographql.com/docs/apollo-server/)
- [Serverless v3.x](https://serverless.com/)
- [Contentful CMS](https://www.contentful.com/)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Code

- GraphQL `hello world` resolver
- `posts` query to fetch posts data from Contentful
- `comments` query to fetch comments data from Contentful

## Installation

### CLI (Recommended)

```bash
npm create @this-dot/starter --kit serverless-framework-apollo-contentful
```

````

or

```bash
yarn create @this-dot/starter --kit serverless-framework-apollo-contentful
````

or

```bash
pnpm create @this-dot/starter --kit serverless-framework-apollo-contentful
```

- Follow the prompts to select the `serverless-framework-apollo-contentful` starter kit and name your new project.
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

### Manual

This requires a download of the entire starter.dev repository and extraction of the `serverless-framework-apollo-contentful` kit from the starters directory.

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/serverless-framework-apollo-contentful` directory to the name of your new project.
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

## Commands

- `npm run dev` - Starts the development server.
- `npm run test` - Runs the unit tests.
- `npm run lint` - Runs ESLint on the project.
- `npm run prettier` - Formats code for the entire project

## Kit Organization / Architecture

The demo components included in the starter kit are co-located with the tests. This kit includes things like mocks, and data fetching queries that are modeled after an MVC type architecture. Using this structure makes it easy to find all the code and functionality related to a specific component. This pattern follows the single responsibility principle since each file has one purpose. For example, the `.resolvers.ts` files handle data for all resolvers with the functionality related to data fetching for your query. The `.test.ts` files handle all the unit tests for the resolvers. The `.typedefs.ts` files handle all the types for GraphQL.

### Example directory

```
- PostModel.ts - Model for the Post entity
- CommentModel.ts - Model for the Comment entity
- posts.resolvers.ts - Resolvers for the Post entity
- comments.resolvers.ts - Resolvers for the Comment entity
- posts.test.ts - Unit tests for the Post entity
- comments.test.ts - Unit tests for the Comment entity
- posts.typedefs.ts - Type definitions for the Post entity
- comments.typedefs.ts - Type definitions for the Comment entity
```
