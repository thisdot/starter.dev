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
  - [Database and RedisTo start up your API in dev mode with an active database connection, please follow the following steps:](#database-and-redisto-start-up-your-api-in-dev-mode-with-an-active-database-connection-please-follow-the-following-steps)
    - [Seeding](#seeding)
    - [Reset infrastructure](#reset-infrastructure)
    - [Production build](#production-build)
    - [CORS Cross-Origin Resource Sharing](#cors-cross-origin-resource-sharing)
  - [Project Structure](#project-structure)
    - [Folder structure](#folder-structure)
    - [MVC Pattern](#mvc-pattern)
    - [Example directory](#example-directory)
  - [Technologies](#technologies)

## Overview

### Tech Stack

- [Express v4](https://expressjs.com)
- [Apollo Server v4](https://typeorm.io)
- [Prisma v4](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Redis](https://redis.io/)
-

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
- Run `npm run docker:mount` to start the database and the redis instances
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
- Run `npm run docker:mount` to start the database and the redis instances
- Run `npm run start` to start the development server.
- Open your browser to `http://localhost:4001` to see the API documentation with the existing endpoints.

## Commands

- `npm run docker:mount` - Starts up a mysql database and two redis instances for caching
- `npm run docker:unmount` - Stops the running database and redis docker containers.
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
- `npm run docker:build` - Builds, (re)creates, starts, and attaches to containers to a service in the background.
- `npm run docker:start` - Runs an existing docker container.
- `npm run docker:stop` - Stops an existing docker container.
- `npm run docker:down` - Stop and removes the docker container & network.
- `npm run docker:remove` - Removes stopped docker service containers.

## Database and RedisTo start up your API in dev mode with an active database connection, please follow the following steps:

1. create a `.env` file. For the defaults, copy the contents of the `.env.example` file's content into it.
2. run `npm run docker:mount`
3. run `npm run dev`

The above steps will make sure your API connects to the database and Redis instances that get started up with docker. When you finish work, run `npm run infrastructure:stop` to stop your database and Redis containers.

### Seeding

TODO

### Reset infrastructure

To seed the database, you need to do the following steps:

1. create a `.env` file. For the defaults, copy the contents of the `.env.example` file's content into it.
2. run `npm run docker:mount`
3. TODO add seeding

### Production build

The `npm run build` command compiles the typescript code into the `/dist` folder and generates a `package.json` file. To use it in production, for example in a docker container, one would copy the contents of the `/dist` folder, and then run `npm install` to have all the dependencies.

### CORS Cross-Origin Resource Sharing

The [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) standard works by adding new HTTP headers that let servers describe which origins are permitted to read that information from a web browser. For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. This means that you cannot request data from web applications on 'https://domain-a.com' from 'https://domain-b.com/data.json'.

This application accepts CORS from all origins by default. Some web applications may require you to add the HTTP header `'Access-Control-Allow-Origin': '*'` to allow access.

In order to restrict origin URLs that can access your API, you need to add a list of comma-separated origin URLs in the `CORS_ALLOWED_ORIGINS` variable located in your `.env` file. For example `CORS_ALLOWED_ORIGINS="https://starter.dev"`. In case you need to access the api in a development environment i.e. a Sveltekit application, you can add the local URL `http://127.0.0.1` to the `CORS_ALLOWED_ORIGINS` variable as `CORS_ALLOWED_ORIGINS=https://starter.dev,http://127.0.0.1`.

## Project Structure

### Folder structure

```text
- prisma
- src
	- graphql
    - data-sources
    - mappers
    - schema
      - hello
      - technology
    - server-context
    - utils
  - main.ts
```

### MVC Pattern

The demo components included in the starter kit are co-located with the tests. This kit includes things like mocks and data-fetching queries that are modeled after an MVC-type architecture. Using this structure makes it easy to find all the code and functionality related to a specific component. This pattern follows the single responsibility principle since each file has one purpose. For example, the .resolvers.ts files handle data for all resolvers with the functionality related to data fetching for your query. The .test.ts files handle all the unit tests for the resolvers. The .typedefs.ts files handle all the types for GraphQL.

### Example directory

- `technologies.resolvers.ts` - Resolvers for the Technology entity.
- `technologies.spec.ts` - Unit tests for the Technology entity.
- `technologies.typedefs.ts` - Type definitions for the Technology entity.Technologies

## Technologies

<!-- ### Express

The ExpressJS API starts at the `main.ts` file. The `bootstrapApp()` method creates and sets up the routes. The API routes are set up under the `src/modules` folder. This set up differentiates modules based on the feature they provide, and in a feature directory you can find the `controller`, related `services` and the `route handlers`.

### Apollo Server

TypeOrm related initiators are set up under the `src/db` folder, the `initialiseDataSource()` function gets called at start-up. It has a built-in retry mechanism that can be configured using environment variables. See the `.env.example` file for more information.

The `DataSource` is set up to look for entities automatically. This kit uses the `src/db/entities` folder to store these, but feel free to store your entities in feature folders or where it makes more sense to you.

You can create your own Entities using the tools provided by TypeOrm. For more information, please refer to [the documentation](https://typeorm.io/entities).

### Caching

Caching is set up with the [cachified](https://www.npmjs.com/package/cachified) library. It utilises redis in the background for caching. Under the `cache` folder you can find the redis client connection and the two functions that are used for caching and invalidating. See the `useCache` and the `clearCacheEntry` methods used in the example CRUD handlers, under `src/modules/technology/handlers`.

### Queue

The queue is set up using [BullMQ](https://www.npmjs.com/package/bullmq) with a redis instance separate from the cache redis instance. You can find how it is set up under the `src/queue` folder.

We set it up to utilise processing in a separate thread. You can trigger the queue by sending a `POST` request to `localhost:3333/queue` with a request body of your choice. You can customise the queue and the job processors as you see fit, for more information on how to do it, please refer to the [BullMQ documentation](https://docs.bullmq.io/).

### Testing

Testing is set up with [Jest](https://jestjs.io/). You can see some example spec files under `src/modules/technology/handlers`.

### API documentation and Schema generation

The kit uses [express-oas-generator](https://www.npmjs.com/package/express-oas-generator) middlewares that generates the OpenAPI documentation into the `swagger.json` and `swagger_v3.json` files. When you are building new API endpoints, the API documentation for those endpoints will be generated.

In order to for this middleware to be able to generate all the data, make sure you hit your freshly created endpoints by using Postman or other similar tools. This is how you can keep the documentation up-to-date. If you'd like to generate an entirely new API documentation, feel free to delete the swagger related json files and restart your dev-server to start from scratch.

When you run the development server, you can find the generated Swagger API documentation page under `localhost:3333/docs`. Please note, that if you don't want to expose this documentation in production, make sure you set the `NODE_ENV` environment variable to `production`.

If you'd like to generate a schema typescript file, run `npm run generate:schema` that will place a `schema.ts` file under the `src/interfaces` folder. This schema will be generated based on the existing `swagger_v3.json` file. -->
