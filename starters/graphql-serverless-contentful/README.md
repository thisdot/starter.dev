# serverless-framework-apollo-contentful starter kit

This starter kit features **Serverless**, **GraphQL**, **Apollo Server**, and **Contentful**.

## Overview

### Tech Stack

- [GraphQL](https://graphql.org/)
- [Apollo Server v4.x](https://www.apollographql.com/docs/apollo-server/)
- [Serverless v3.x](https://serverless.com/)
- [Contentful CMS](https://www.contentful.com/)
- [Redis](https://redis.com)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Code

- `Technology` query to fetch technology data from Contentful

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
- The kit uses docker for redis caching locally. Start up the container with:

 ```shell
 npm run infrastructure:build
 ```

- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

### Manual

This requires a download of the entire starter.dev repository and extraction of
the `serverless-framework-apollo-contentful` kit from the starters directory.

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/serverless-framework-apollo-contentful` directory to the name of your new project.
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

### Environment variables

Copy the content of `.env.example` into a new `.env` file.

```bash
cp .env.example .env
```

You would need an account with [contentful.com](http://contentful.com) in order to get the environment variables required:

```bash
CONTENTFUL_CONTENT_MANAGEMENT_API_TOKEN=xxx
CONTENTFUL_SPACE_ID=xxx
CONTENTFUL_ENVIRONMENT=master
```

#### Steps to setup contentful

1. Once you're signed in to contentful create a space

2. When that's done, go to **Settings** -> **API keys**
   Click on **Generate personal token** to get the `CONTENTFUL_CONTENT_MANAGEMENT_API_TOKEN` variable
   ![API tokens](./screenshots/api-tokens.png)

3. Go to **Settings** -> **General settings** to get the `CONTENTFUL_SPACE_ID`
   ![Space ID](./screenshots/space-id.png)  
   After you've gotten your API TOKEN and Space ID from contentful, modify the `.env` file and replace them with `xxx`.

4. For demo purposes, this kit comes pre-configured with a `Technology` model. To use this, create the content model for
   it in Contentful. The model has `displayName`, `description` and `url` text fields, the `id` field gets provided by
   Contentful.
   ![content models](./screenshots/content-models.png)

The kit uses Redis for caching, so you would also need the credentials for the redis server.

```bash
REDIS_USER=default
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASS=
REDIS_CACHE_TTL_SECONDS=900
```

These are the defaults and should work seamlessly if you have redis running already on your local.

## Commands

- `npm run dev` - Starts the development server.
- `npm run test` - Runs the unit tests.
- `npm run lint` - Runs ESLint on the project.
- `npm run prettier` - Formats code for the entire project

## Kit Organization / Architecture

The demo components included in the starter kit are co-located with the tests. This kit includes things like mocks, and
data fetching queries that are modeled after an MVC type architecture. Using this structure makes it easy to find all
the code and functionality related to a specific component. This pattern follows the single responsibility principle
since each file has one purpose. For example, the `.resolvers.ts` files handle data for all resolvers with the
functionality related to data fetching for your query. The `.test.ts` files handle all the unit tests for the resolvers.
The `.typedefs.ts` files handle all the types for GraphQL.

### Example directory

```
- TechnologyModel.ts - Model for the Technology entity
- technologies.resolvers.ts - Resolvers for the Technology entity
- technologies.test.ts - Unit tests for the Technology entity
- technologies.typedefs.ts - Type definitions for the Technology entity
```
