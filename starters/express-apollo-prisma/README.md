# express-apollo-prisma starter kit

This starter kit features Express, Typescript API setup

## Table of Contents

- [express-apollo-prisma starter kit](#express-apollo-prisma-starter-kit)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Included Tooling](#included-tooling)
  - [Installation](#installation)
    - [CLI (Recommended)](#cli-recommended)
    - [Manual](#manual)
  - [Commands](#commands)
    - [Database and Redis](#database-and-redis)
    - [Seeding](#seeding)
    - [Production build](#production-build)
    - [CORS Cross-Origin Resource Sharing](#cors-cross-origin-resource-sharing)
  - [Project Structure](#project-structure)
    - [Folder structure](#folder-structure)
    - [GraphQL Moodules](#graphql-moodules)
      - [Example GraphQL Module](#example-graphql-module)
  - [Technologies](#technologies)
    - [Express](#express)
    - [Apollo Server](#apollo-server)
    - [Caching](#caching)
    - [Testing](#testing)

## Overview

### Tech Stack

- [Express v4](https://expressjs.com)
- [Apollo Server v4](https://typeorm.io)
- [Prisma v4](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Redis](https://redis.io/)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## Installation

### CLI (Recommended)

```bash
npm create @this-dot/starter --kit express-apollo-prisma
```

or

```bash
yarn create @this-dot/starter --kit express-apollo-prisma
```

- Follow the prompts to select the `express-apollo-prisma` starter kit and name your new project.
- `cd` into your project directory and run `npm install`.
- Make sure you have docker & docker-compose installed on your machine
- Create a `.env` file and copy the contents of `.env.example` into it.
- Run `npm run infrastructure:start` to start the database and the Redis instances
- Run `npm run start` to start the development server.
- Open your browser to `http://localhost:4001` to see the API documentation with the existing endpoints.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/express-apollo-prisma` directory to the name of your new project.
- Make sure you have docker & docker-compose installed on your machine
- `cd` into your project directory and run `npm install`.
- Make sure you have docker & docker-compose installed on your machine
- Create a `.env` file and copy the contents of `.env.example` into it.
- Run `npm run infrastructure:start` to start the database and the Redis instances
- Run `npm run start` to start the development server.
- Open your browser to `http://localhost:4001` to see the API documentation with the existing endpoints.

## Commands

- `npm run infrastructure:start` - Starts up a Mysql database and Redis instance for caching
- `npm run infrastructure:stop` - Stops the running database and Redis docker containers.
<!-- TODO - `npm run db:seed` - Allows you to seed the database (See the Seeding section) -->
- `npm run dev` - Starts the development server (Needs a running infrastructure first)
- `npm run build` - Builds the app.
- `npm start` - Starts the built app. (Needs a running infrastructure first)
- `npm test` - Runs the unit tests.
- `npm run lint` - Runs ESLint on the project.
- `npm run format` - Formats code for the entire project.
- `npm prisma:format` - Updates your database using migrations during development and creates the database if it does not exist.
- `npm prisma:migrate:reset` - Deletes and recreates the database, or performs a 'soft reset' by removing all data, tables, indexes, and other artifacts.
- `npm prisma:migrate:dev` - updates your database using migrations during development and creates the database if it does not exist.
- `npm run prisma:generate` - Generates the API schema types into the `src/interfaces/schema.ts` file
- `npm run prisma:deploy` - Applies all pending migrations, and creates the database if it does not exist. Primarily used in non-development environments.

### Database and Redis

To start up your API in dev mode with an active database connection, please follow the following steps:

1. create a `.env` file. For the defaults, copy the contents of the `.env.example` file's content into it.
2. run `npm run infrastructure:start`
3. run `npm run dev`

The above steps will make sure your API connects to the database and Redis instances that get started up with docker. When you finish work, run `npm run infrastructure:stop` to stop your MySQL and Redis containers.

### Seeding

<!-- TODO To seed the database, you need to do the following steps:

1. create a `.env` file. For the defaults, copy the contents of the `.env.example` file's content into it.
2. run `npm run infrastructure:start`
3. run `npm run db:seed` -->

### Production build

The `npm run build` command compiles the typescript code into the `/dist` folder and generates a `package.json` file. To use it in production, for example in a docker container, one would copy the contents of the `/dist` folder, and then run `npm install` to have all the dependencies.

### CORS Cross-Origin Resource Sharing

The [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) standard works by adding new HTTP headers that let servers describe which origins are permitted to read that information from a web browser. For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. This means that you cannot request data from web applications on 'https://domain-a.com' from 'https://domain-b.com/data.json'.

This application accepts CORS from all origins by default. Some web applications may require you to add the HTTP header `'Access-Control-Allow-Origin': '*'` to allow access.

In order to restrict origin URLs that can access your API, you need to add a list of comma-separated origin URLs in the `CORS_ALLOWED_ORIGINS` variable located in your `.env` file. For example `CORS_ALLOWED_ORIGINS="https://starter.dev"`. In case you need to access the API in a development environment i.e. a Sveltekit application, you can add the local URL `http://127.0.0.1` to the `CORS_ALLOWED_ORIGINS` variable as `CORS_ALLOWED_ORIGINS=https://starter.dev,http://127.0.0.1`.

## Project Structure

### Folder structure

```text
- **/prisma/** - holds prisma migration files and schema.
- **/src
  - /graphql - holds graphql-related files.
    - /data-sources/** - holds a Datasource file for each model.
    - /mappers/** - holds a mappers for particular models.
    - /schema/** - holds a directory for each GraphQL Module. Each module needs a `resolver`, `typedef` and optionally  a test.
    - /server-context/** - holds server-context types and middleware
    - /utils/** - holds related utilities required in graphql connection
  - /redis/** - holds redis connection files
  - main.ts - bootstraps Express application with Apollo Server
```

### GraphQL Moodules

This pattern follows the single responsibility principle since each file has one purpose. For example, the .resolvers.ts files handle data for all resolvers with the functionality related to data fetching for your query. The .spec.ts files handle all the unit tests for the resolvers. The .typedefs.ts files handle all the types for GraphQL.

#### Example GraphQL Module

- `technologies.resolvers.ts` - Resolvers for the Technology entity.
- `technologies.spec.ts` - Unit tests for the Technology entity.
- `technologies.typedefs.ts` - Type definitions for the Technology entity.

## Technologies

### Express

The ExpressJS API starts at the `main.ts` file. The `bootstrapApp()` method uses the `expressMiddleware` function from `@apollo/server` to create Graphql endpoints.

### Apollo Server

Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client. It's the best way to build a production-ready, self-documenting GraphQL API that can use data from any source.

We use the [`expressMiddleware`](https://www.apollographql.com/docs/apollo-server/api/express-middleware#expressmiddleware) function from `@apollo/server` to enable you to attach Apollo Server to an Express server. We also recommend using [`ApolloServerPluginDrainHttpServer`](https://www.apollographql.com/docs/apollo-server/api/plugin/drain-http-server) plugin to ensure your server gracefully shuts down.

The data sources are located in `src/graphql/data-sources`. The data sources of the entities are passed in `src\graphql\server-context\server-context-middleware-options.ts`.

### Caching

To reduce API response times and [rate limiting](https://en.wikipedia.org/wiki/Rate_limiting), you can cache your data so that the application makes a single request to an API, and all the subsequent data requests will retrieve the data from the cache. We use Redis, an in-memory database that stores data in the server memory, to counter our response problems.

We set up Redis by creating a Redis client with the `createClient` function from the `redis` package. Each entity has optional caching. This can be achieved by passing the Redis client with the TTL(time to live) in the `src\graphql\server-context\server-context-middleware-options.ts`.

### Testing

Testing is set up with [Jest](https://jestjs.io/). You can see some example spec files under `src/graphql/schema/technology`.
