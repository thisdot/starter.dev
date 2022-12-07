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
    - [CORS Cross-Origin Resource Sharing](#cors-cross-origin-resource-sharing)
  - [Kit Organization / Architecture](#kit-organization--architecture)
    - [Example directory](#example-directory)
  - [Demo Implementation](#demo-implementation)

## Overview

### Tech Stack

- [Express v4](https://expressjs.com)
- [TypeOrm](https://typeorm.io)
- [PostgreSQL](https://www.postgresql.org)
- [Redis](https://redis.io/)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Controllers

The starter contains an example CRUD implementation for technologies. You can find the controller and its handlers under the `/src/controllers/technology/` folder.

The handlers have caching enabled using the [cachified](https://www.npmjs.com/package/cachified) package. It uses redis under the hood.

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
- Create a `.env` file and copy the contents of `.env.example` into it.
- Run `npm run dev` to start the development server and infrastructure.
- Make sure you have docker & docker-compose installed on your machine
- Open your browser to `http://localhost:3000` to see the included example code running.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/express-typescript-typeorm-postgres` directory to the name of your new project.
- `cd` into your project directory and run `npm install`.
- Create a `.env` file and copy the contents of `.env.example` into it.
- Make sure you have docker & docker-compose installed on your machine
- Run `npm run dev` to start the server and infrastructure.

- Open your browser to `http://localhost:3333/api-docs` to see the included example code running.

## Commands

- `npm run infrastructure:start` - Starts up a postgres database and a redis instance for caching
- `npm run infrastructure:stop` - Stops the running database and redis docker containers.
- `npm run infrastructure:clear` - Clears the database and cache, removes dist folder, removes docker images.
- `npm run db:delete` - Deletes everything database related and allows you to reinitialise your database.
- `npm run db:seed` - Allows you to seed the database (See the Seeding section)
- `npm run cache:delete` - Removes everything stored in the cache, and deletes the cache docker image
- `npm run dev` - Starts the development server and the infrastructure necessary to run it.
- `npm run build` - Builds the app.
- `npm start` - Starts the built app. (Needs a running infrastructure first)
- `npm test` - Runs the unit tests.
- `npm run lint` - Runs ESLint on the project.
- `npm run format` - Formats code for the entire project

## Database and Redis

In order to start up your API in dev mode with an active database connection, please follow the following steps:

1. create a `.env` file. For the defaults, copy the contents of the `.env.example` file's content into it.
2. run `npm run db:init`
3. run `npm run db:start`

The above steps will make sure your API connects to the database instance that gets started up with docker. When you finish work, run `npm run db:stop` to stop your database container.

### Seeding

In the `src/db/run-seeders.ts` file, we provide a script to seed the database with intial values, using TypeOrm. Under the `src/db/seeding` folder, you can find the `TechnologySeeder` class, that seeds values into the database as an example.

In order to be seed the database, first you must set up the infrastructure, by running `npm run infrastructure:init`.

After the database is initialised, set up your `.env` file to provide the necessary environment variables (use the `.env.example` file) for the database connection and run `npm run dev` to start up your API.

The API will start up for the first time and will set up the tables and schemas, then run your seeder by running the `npm run db:seed` command.

For local development, the db:init method also mounts the `pg_data` folder with the `-v $PWD/pg_data:/var/lib/postgresql/data` command, therefore, your data is kept locally for you.

Running `npm run db:delete` will delete everything and allows you to re-initialize your database from zero.

### Production build

The `npm run build` command compiles the typescript code into the `/dist` folder and generates a `package.json` file. To use it in production, for example in a docker container, one would copy the contents of the `/dist` folder, and then run `npm install` to have all the dependencies.

### CORS Cross-Origin Resource Sharing

The [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) standard works by adding new HTTP headers that let servers describe which origins are permitted to read that information from a web browser. For Security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. This means that you cannot request data from web application on 'https://domain-a.com' from 'https://domain-b.com/data.json'.

This application accepts CORS from all origins by default. Some web applications may require you to add the HTTP header `'Access-Control-Allow-Origin': '*'` to allow access.

In order to restrict origins urls that can access your api, you need to add a list of comma separated origin urls in the `CORS_ALLOWED_ORIGINS` variable located in your `.env` file. For example `CORS_ALLOWED_ORIGINS="https://start.dev"`. In case you need to access the api in a development environment i.e. a sveltekit application, you can add the local url `http://127.0.0.1` to the `CORS_ALLOWED_ORIGINS` variable as `CORS_ALLOWED_ORIGINS=https://start.dev,http://127.0.0.1`

## Kit Organization / Architecture

[//]: # (TODO: architecture)
