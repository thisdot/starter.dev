# express-typescript-typeorm-postgres starter kit

This starter kit features Express, Typescript API setup

## Table of Contents

- [express-typescript-typeorm-postgres starter kit](#express-typescript-typeorm-postgres-starter-kit)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Included Tooling](#included-tooling)
    - [Example Controllers](#example-controllers)
  - [Installation](#installation)
    - [CLI (Recommended)](#cli-recommended)
    - [Manual](#manual)
  - [Commands](#commands)
  - [Database and Redis](#database-and-redis)
    - [Seeding](#seeding)
    - [Reset infrastructure](#reset-infrastructure)
    - [Production build](#production-build)
    - [CORS Cross-Origin Resource Sharing](#cors-cross-origin-resource-sharing)
  - [Kit Organization / Architecture](#kit-organization--architecture)
    - [Express](#express)
    - [TypeOrm](#typeorm)
    - [Caching](#caching)
    - [Queue](#queue)
    - [Testing](#testing)

## Overview

### Tech Stack

- [Express v4](https://expressjs.com)
- [TypeOrm](https://typeorm.io)
- [PostgreSQL](https://www.postgresql.org)
- [Redis](https://redis.io/)
- [BullMQ](https://docs.bullmq.io/)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Controllers

The starter contains an example CRUD implementation for technologies. You can find the controller and its handlers under the `/src/controllers/technology/` folder.

The handlers have caching enabled using the [cachified](https://www.npmjs.com/package/cachified) package. It uses redis under the hood. For more information on these endpoints, see the code, or check out the localhost:3333/docs after you start up your development server.

## Installation

### CLI (Recommended)

```bash
npm create @this-dot/starter --kit express-typescript-typeorm-postgres
```

or

```bash
yarn create @this-dot/starter --kit express-typescript-typeorm-postgres
```

- Follow the prompts to select the `express-typescript-typeorm-postgres` starter kit and name your new project.
- `cd` into your project directory and run `npm install`.
- Make sure you have docker & docker-compose installed on your machine
- Create a `.env` file and copy the contents of `.env.example` into it.
- Run `npm run infrastructure:start` to start the database and the redis instances
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3333/health` to see the API running.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/express-typescript-typeorm-postgres` directory to the name of your new project.
- Make sure you have docker & docker-compose installed on your machine
- `cd` into your project directory and run `npm install`.
- Make sure you have docker & docker-compose installed on your machine
- Create a `.env` file and copy the contents of `.env.example` into it.
- Run `npm run infrastructure:start` to start the database and the redis instances
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3333/health` to see the API running.

## Commands

- `npm run infrastructure:start` - Starts up a postgres database and two redis instances for caching
- `npm run infrastructure:stop` - Stops the running database and redis docker containers.
- `npm run db:seed` - Allows you to seed the database (See the Seeding section)
- `npm run dev` - Starts the development server (Needs a running infrastructure first)
- `npm run build` - Builds the app.
- `npm start` - Starts the built app. (Needs a running infrastructure first)
- `npm test` - Runs the unit tests.
- `npm run lint` - Runs ESLint on the project.
- `npm run format` - Formats code for the entire project

## Database and Redis

In order to start up your API in dev mode with an active database connection, please follow the following steps:

1. create a `.env` file. For the defaults, copy the contents of the `.env.example` file's content into it.
2. run `npm run infrastructure:start`
3. run `npm run dev`

The above steps will make sure your API connects to the database and redis instances that gets started up with docker. When you finish work, run `npm run infrastructure:stop` to stop your database and redis containers.

### Seeding

In the `src/db/run-seeders.ts` file, we provide a script to seed the database with intial values, using TypeOrm. Under the `src/db/seeding` folder, you can find the `TechnologySeeder` class, that seeds values into the database as an example.

In order to seed the database, you need to do the following steps:

1. create a `.env` file. For the defaults, copy the contents of the `.env.example` file's content into it.
2. run `npm run infrastructure:start`
3. run `npm run db:seed`

### Reset infrastructure

If you for some reason need to clear the contents of your database and you want to reinitialise it, delete the `misc/pg_data` folder and delete the postgres docker container. After that the next `infrastructure:start` command will start up as it would the first time.

If you would like to clear your redis cache and reinitialise it, delete the `misc/cache_conf` and the `misc/cache_data` folders and delete the cache docker container.

If you would like to clear your redis queue and reinitialise it, delete the `misc/queue_conf` and the `misc/queue_data` folders and delete the queue docker container.

### Production build

The `npm run build` command compiles the typescript code into the `/dist` folder and generates a `package.json` file. To use it in production, for example in a docker container, one would copy the contents of the `/dist` folder, and then run `npm install` to have all the dependencies.

### CORS Cross-Origin Resource Sharing

The [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) standard works by adding new HTTP headers that let servers describe which origins are permitted to read that information from a web browser. For Security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. This means that you cannot request data from web application on 'https://domain-a.com' from 'https://domain-b.com/data.json'.

This application accepts CORS from all origins by default. Some web applications may require you to add the HTTP header `'Access-Control-Allow-Origin': '*'` to allow access.

In order to restrict origins urls that can access your api, you need to add a list of comma separated origin urls in the `CORS_ALLOWED_ORIGINS` variable located in your `.env` file. For example `CORS_ALLOWED_ORIGINS="https://start.dev"`. In case you need to access the api in a development environment i.e. a sveltekit application, you can add the local url `http://127.0.0.1` to the `CORS_ALLOWED_ORIGINS` variable as `CORS_ALLOWED_ORIGINS=https://start.dev,http://127.0.0.1`.

## Kit Organization / Architecture

### Express

The ExpressJS API starts at the `main.ts` file. The `bootstrapApp()` method creates and sets up the routes. The API routes are set up under the `src/controllers` folder. Route handlers and feature specific routes are set up under feature folders.

### TypeOrm

TypeOrm related initiators are set up under the `src/db` folder, the `initialiseDataSource()` function gets called at start-up. It has a built-in retry mechanism that can be configured using environment variables. See the `.env.example` file for more information.

The `DataSource` is set up to look for entities automatically. This kit uses the `src/db/entities` folder to store these, but feel free to store your entities in feature folders or where it makes more sense to you.

### Caching

Caching is set up with the [cachified](https://www.npmjs.com/package/cachified) library. It utilises redis in the background for caching. Under the `cache` folder you can find the redis client connection and the two functions that are used for caching and invalidating. See the `useCache` and the `clearCacheEntry` methods used in the example CRUD handlers, under `src/controllers/technology/handlers`.

### Queue

The queue is set up using [BullMQ](https://docs.bullmq.io/) with a redis instance separate from the cache redis instance. You can find how it is set up under the `src/queue` folder to utilise processing in a separate thread. You can trigger the queue by sending a `POST` request to localhost:3333/queue with a request body.

### Testing
Testing is set up with [Jest](https://jestjs.io/). You can see some example spec files under `src/controllers/technology/handlers`.
