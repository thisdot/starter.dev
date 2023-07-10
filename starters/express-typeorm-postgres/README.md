# express-typeorm-postgres starter kit

This starter kit features Express, Typescript API setup

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

## Installation

### CLI (Recommended)

```bash
npm create @this-dot/starter -- --kit express-typeorm-postgres
```

or

```bash
yarn create @this-dot/starter --kit express-typeorm-postgres
```

- Follow the prompts to select the `express-typeorm-postgres` starter kit and name your new project.
- `cd` into your project directory and run `npm install`.
- Make sure you have docker & docker-compose installed on your machine
- Create a `.env` file and copy the contents of `.env.example` into it.
- Run `npm run infrastructure:up` to start the database and the Redis instances
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3333/docs` to see the API documentation with the existing endpoints.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/express-typeorm-postgres` directory to the name of your new project.
- Make sure you have docker & docker-compose installed on your machine
- `cd` into your project directory and run `npm install`.
- Make sure you have docker & docker-compose installed on your machine
- Create a `.env` file and copy the contents of `.env.example` into it.
- Run `npm run infrastructure:up` to start the database and the Redis instances
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3333/docs` to see the API documentation with the existing endpoints.

## Commands

- `npm run infrastructure:up` - Starts up a Postgres database and two Redis instances for caching
- `npm run infrastructure:pause` - Stops running containers without removing them. They can be started again with `npm run infrastructure:up`.
- `npm run infrastructure:down` - Stops and removes containers, networks and volumes of all the services created by `npm run infrastructure:up`.
- `npm run db:seed` - Allows you to seed the database (See the Seeding section)
- `npm run dev` - Starts the development server (Needs a running infrastructure first)
- `npm run build` - Builds the app.
- `npm start` - Starts the built app. (Needs a running infrastructure first)
- `npm test` - Runs the unit tests.
- `npm run lint` - Runs ESLint on the project.
- `npm run format` - Formats code for the entire project
- `npm run generate:schema` - Generates the API schema types into the `src/interfaces/schema.ts` file

## Example Controllers

The starter contains an example CRUD implementation for technologies. You can find the controller and its handlers under the `/src/modules/technology/` folder.

The handlers have caching enabled using the [cachified](https://www.npmjs.com/package/cachified) package. It uses Redis under the hood. For more information on these endpoints, see the code, or check out the `localhost:3333/docs` after you start up your development server.

## Database and Redis

In order to start up your API in dev mode with an active database connection, please follow the following steps:

1. create a `.env` file. For the defaults, copy the contents of the `.env.example` file's content into it.
2. run `npm run infrastructure:up`
3. run `npm run dev`

The above steps will make sure your API connects to the database and Redis instances that gets started up with docker. When you finish work, run `npm run infrastructure:down` to stop your database and Redis containers.

### Seeding

In the `src/db/run-seeders.ts` file, we provide a script to seed the database with intial values, using TypeOrm. Under the `src/db/seeding` folder, you can find the `TechnologySeeder` class, that seeds values into the database as an example.

In order to seed the database, you need to do the following steps:

1. create a `.env` file. For the defaults, copy the contents of the `.env.example` file's content into it.
2. run `npm run infrastructure:up`
3. run `npm run db:seed`

### Reset infrastructure

If you for some reason need to clear the contents of your database and you want to reinitialise it, run `infrastructure:down`. After that, the next `infrastructure:up` command will start up as it would the first time.

### Production build

The `npm run build` command compiles the typescript code into the `/dist` folder and generates a `package.json` file. To use it in production, for example in a docker container, one would copy the contents of the `/dist` folder, and then run `npm install` to have all the dependencies.

### CORS Cross-Origin Resource Sharing

The [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) standard works by adding new HTTP headers that let servers describe which origins are permitted to read that information from a web browser. For Security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. This means that you cannot request data from web application on 'https://domain-a.com' from 'https://domain-b.com/data.json'.

This application accepts CORS from all origins by default. Some web applications may require you to add the HTTP header `'Access-Control-Allow-Origin': '*'` to allow access.

In order to restrict origins urls that can access your api, you need to add a list of comma separated origin urls in the `CORS_ALLOWED_ORIGINS` variable located in your `.env` file. For example `CORS_ALLOWED_ORIGINS="https://starter.dev"`. In case you need to access the api in a development environment i.e. a sveltekit application, you can add the local url `http://127.0.0.1` to the `CORS_ALLOWED_ORIGINS` variable as `CORS_ALLOWED_ORIGINS=https://starter.dev,http://127.0.0.1`.

## Kit Organization / Architecture

### Folder structure

```text
- misc
- src
	- cache
	- constants
	- db
	- interfaces
	- middlewares
	- modules
	- queue
	- utils
- tools
```

The `misc` folder contains sub-folders for the infrastructure docker containers. When you start up your infrastructure, the sub-folders get mounted to the Redis and Postgres docker containers. This allows persisting data during development and lets developers to quickly get rid of database contents and reinitalise their infrastructure.

The `src` folder contains everything that is related to API development. The `cache`, `db` and `queue` folders contain everything that has to do with connecting to the Redis and Postgres containers. The `constants`, `utils` and `interfaces` folders contain logic, types and variables that are / can be shared across the codebase. The `middlewares` folder contains custom and/or customised middlewares for the application.

The `src/modules` folder contains the controllers, route handlers and services separated in feature related directories. Every feature directory should contain logic related to that particular feature.

The `tools` folder contains scripts that help with generating files or building the app. For example, a generator script is provided that creates a sanitized package.json for the production built code, which can be used to install only the dependencies used in the API.

### Express

The ExpressJS API starts at the `main.ts` file. The `bootstrapApp()` method creates and sets up the routes. The API routes are set up under the `src/modules` folder. This set up differentiates modules based on the feature they provide, and in a feature directory you can find the `controller`, related `services` and the `route handlers`.

### TypeOrm

TypeOrm related initiators are set up under the `src/db` folder, the `initialiseDataSource()` function gets called at start-up. It has a built-in retry mechanism that can be configured using environment variables. See the `.env.example` file for more information.

The `DataSource` is set up to look for entities automatically. This kit uses the `src/db/entities` folder to store these, but feel free to store your entities in feature folders or where it makes more sense to you.

You can create your own Entities using the tools provided by TypeOrm. For more information, please refer to [the documentation](https://typeorm.io/entities).

### Caching

Caching is set up with the [cachified](https://www.npmjs.com/package/cachified) library. It utilises Redis in the background for caching. Under the `cache` folder you can find the Redis client connection and the two functions that are used for caching and invalidating. See the `useCache` and the `clearCacheEntry` methods used in the example CRUD handlers, under `src/modules/technology/handlers`.

### Queue

The queue is set up using [BullMQ](https://www.npmjs.com/package/bullmq) with a Redis instance separate from the cache Redis instance. You can find how it is set up under the `src/queue` folder.

We set it up to utilise processing in a separate thread. You can trigger the queue by sending a `POST` request to `localhost:3333/queue` with a request body of your choice. You can customise the queue and the job processors as you see fit, for more information on how to do it, please refer to the [BullMQ documentation](https://docs.bullmq.io/).

### Testing

Testing is set up with [Jest](https://jestjs.io/). You can see some example spec files under `src/modules/technology/handlers`.

### API documentation and Schema generation

The kit uses [express-oas-generator](https://www.npmjs.com/package/express-oas-generator) middlewares that generates the OpenAPI documentation into the `swagger.json` and `swagger_v3.json` files. When you are building new API endpoints, the API documentation for those endpoints will be generated.

In order to for this middleware to be able to generate all the data, make sure you hit your freshly created endpoints by using Postman or other similar tools. This is how you can keep the documentation up-to-date. If you'd like to generate an entirely new API documentation, feel free to delete the swagger related json files and restart your dev-server to start from scratch.

When you run the development server, you can find the generated Swagger API documentation page under `localhost:3333/docs`. Please note, that if you don't want to expose this documentation in production, make sure you set the `NODE_ENV` environment variable to `production`.

If you'd like to generate a schema typescript file, run `npm run generate:schema` that will place a `schema.ts` file under the `src/interfaces` folder. This schema will be generated based on the existing `swagger_v3.json` file.
