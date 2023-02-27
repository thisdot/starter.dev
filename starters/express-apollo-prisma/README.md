# express-apollo-prisma starter kit

This starter kit features Express, Apollo Server and Prisma.

## Table of Contents

- [express-apollo-prisma starter kit](#express-apollo-prisma-starter-kit)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Included Tooling](#included-tooling)
  - [Installation](#installation)
    - [CLI (Recommended)](#cli-recommended)
    - [Manual](#manual)
  - [Built-in Scripts](#built-in-scripts)
  - [Environment Variables](#environment-variables)
    - [Database and Redis](#database-and-redis)
    - [Seeding](#seeding)
    - [Updating Schemas and Entities](#updating-schemas-and-entities)
    - [Production build](#production-build)
    - [CORS Cross-Origin Resource Sharing](#cors-cross-origin-resource-sharing)
  - [Project Structure](#project-structure)
    - [Folder structure](#folder-structure)
    - [GraphQL Moodules](#graphql-moodules)
      - [Example GraphQL Module](#example-graphql-module)
  - [Technologies](#technologies)
    - [Express](#express)
    - [Apollo Server](#apollo-server)
    - [ORM](#orm)
    - [Queueing](#queueing)
    - [Caching](#caching)
    - [Testing](#testing)
  - [Deployment](#deployment)

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
- Make sure you have `docker` & `docker-compose` installed on your machine
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

## Built-in Scripts

- `npm run infrastructure:start` - Starts up a Mysql database and Redis instance for caching
- `npm run infrastructure:stop` - Stops the running database and Redis docker containers.
- `npm run db:seed` - Allows you to seed the database (See the Seeding section)
- `npm run dev` - Starts the development server (Needs a running infrastructure first)
- `npm run build` - Builds the app.
- `npm start` - Starts the built app. (Needs a running infrastructure first)
- `npm test` - Runs the unit tests.
- `npm run lint` - Runs ESLint on the project.
- `npm run format` - Formats code for the entire project.
- `npm prisma:format` - Updates your database using migrations during development and creates the database if it does not exist.
- `npm prisma:migrate:reset` - Deletes and recreates the database, or performs a 'soft reset' by removing all data, tables, indexes, and other artifacts.
- `npm prisma:migrate:dev` - Updates your database using migrations during development and creates the database if it does not exist.
- `npm run prisma:generate` - Generates the API schema types into the `src/interfaces/schema.ts` file
- `npm run prisma:deploy` - Applies all pending migrations, and creates the database if it does not exist. Primarily used in non-development environments.
- `npm queue:run` - Queue runner script. Runs the queue worker.

## Environment Variables

- `PORT` - The port exposed to connect with the application.
- `DATABASE_URL` - The database connection URL.
- `REDIS_URL` - The Redis connection URL
- `REDIS_CACHE_TTL_SECONDS` - The remaining time(seconds) to live of a key that has a timeout.
- `DOCKER_MYSQLDB_ROOT_PASSWORD` - The MySQL root user password.
- `DOCKER_MYSQLDB_DATABASE` - The MySQL database name.
- `DOCKER_MYSQLDB_PORT_LOCAL` - The MySQL Docker host's TCP port.
- `DOCKER_MYSQLDB_PORT_CONTAINER` - The MySQL Docker container's TCP port.
- `DOCKER_REDIS_PASSWORD` - The Redis password.
- `DOCKER_REDIS_HOST` - The Redis host IP.
- `DOCKER_REDIS_PORT_LOCAL` - The Redis Docker host's TCP port.
- `DOCKER_REDIS_PORT_CONTAINER` - The Redis Docker container's TCP port.
- `AMQP_URL` - The RabbitMQ connection URL.
- `AMQP_QUEUE_JOB` - The RabbitMQ channel queue name.

We map TCP port `DOCKER_MYSQLDB_PORT_CONTAINER` in the container to port `DOCKER_MYSQLDB_PORT_LOCAL` on the Docker host.
We also map TCP port `DOCKER_REDIS_PORT_LOCAL` in the container to port `DOCKER_REDIS_PORT_CONTAINER` on the Docker host.

To ensure proper connection to our resources
For more information on Docker container networks: https://docs.docker.com/config/containers/container-networking/

### Database and Redis

To start up your API in development mode with an active database connection, please follow the following steps:

1. create a `.env` file. For the defaults, copy the contents of the `.env.example` file's content into it.
2. run `npm run infrastructure:start`
3. run `npm run dev`

The above steps will make sure your API connect to the database and Redis instances that get started up with docker. Run `npm run infrastructure:stop` to stop your MySQL, Redis & RabbitMQ containers.

### Seeding

To seed the database, you need to do the following steps:

1. create a `.env` file. For the defaults, copy the contents of the `.env.example` file's content into it.
2. run `npm run infrastructure:start`
3. run `npm run db:seed`

### Updating Schemas and Entities

As your application grows you need to add/update your entities.

For example, let's edit your `Technology` entity.

1. Edit your `prisma/schema.prisma` file and add an `authorName` property to your entity

   ```prisma
    model TechnologyEntity {
      authorName  String?
      description String?
      displayName String  @unique
      id          Int     @id @default(autoincrement())
      url         String?

      @@map("technology")
    }
   ```

2. Run `npm run prisma:migrate:dev` to generate a migration on Prisma.
   Then add your migration name.

  <!-- Reminder to change images adresses once deployed to main to allow them to show up on starter.dev  -->

![Prisma Generate](screenshots/prisma_generate.png)

This will generate a migration folder under `prisma/migrations`. That alters our database schema.

![authorName migration](screenshots/authorName_migration.png)

3. Update your GraphQL type definitions for the `Technology` entity `src/graphql/schema/technology/technology.typedefs.ts` with the new `authorName` property.

   ```ts
   import gql from 'graphql-tag';

   export const technologyTypeDefs = gql`
   	"""
   	Technology object
   	"""
   	type Technology {
   		"The ID of the Technology"
   		id: ID!
   		"The name of the Technology"
   		displayName: String!
   		"A brief description of the Technology"
   		description: String
   		"The link to the Technology's documentation"
   		url: String
   		"The author of the technology"
   		authorName: String
   	}

   	type Query {
   		"Returns a single Technology by ID"
   		technology(id: ID!): Technology
   		"Returns a list of Technologies"
   		technologies: [Technology]!
   	}

   	input CreateTechnology {
   		"Technology Name"
   		displayName: String!
   		"A brief description of the Technology"
   		description: String
   		"The link to the Technology's documentation"
   		url: String
   		"The author of the technology"
   		authorName: String
   	}

   	input UpdateTechnology {
   		"Technology Name"
   		displayName: String
   		"A brief description of the Technology"
   		description: String
   		"The link to the Technology's documentation"
   		url: String
   		"The author of the technology"
   		authorName: String
   	}

   	"""
   	Technology mutations
   	"""
   	type Mutation {
   		"Creates a new Technology"
   		createTechnology(input: CreateTechnology!): Technology!
   		"Updates a Technology"
   		updateTechnology(id: ID!, input: UpdateTechnology!): Technology!
   		"Removes a Technology"
   		deleteTechnology(id: ID!): Boolean
   	}
   `;
   ```

   You can download the [Apollo GraphQL extension](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) that adds syntax highlighting for GraphQL files and gql templates inside JavaScript files.

4. Update our automatically generated code by running `npm run codegen`. This will generate a new `src/graphql/schema/index.ts` file.
   ```sh
   npm run codegen
   ```
5. Finally, update your resolvers with updated properties you'd like to be returned by GraphQL.

### Production build

The `npm run build` command compiles the TypeScript code into the `/dist` folder and generates a `package.json` file. To use it in production, for example in a Docker container, one would copy the contents of the `/dist` folder, and then run `npm install` to have all the dependencies.

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

### ORM

The kit uses Prisma as TypeScript ORM which makes working with databases easy for application developers and features.

We use Prisma for the following:

- [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client) - an auto-generated and type-safe database client for use in your application.
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate) - a declarative data modeling and migration tool.
- [Prisma Studio](https://www.prisma.io/studio) - the easiest way to explore and manipulate your data in all of your Prisma projects.

To learn more about [Prisma](https://www.prisma.io/docs/concepts/overview/prisma-in-your-stack/is-prisma-an-orm)

### Queueing

RabbitMQ is an open-source message broker that allows multiple applications to communicate with each other through queues. It's a powerful tool for handling tasks asynchronously and distributing workloads across multiple machines.

RabbitMQ offers several benefits, such as:

1. Scalability: It can handle large volumes of messages and distribute workloads across multiple machines.
2. Reliability: messages are stored in a durable queue, ensuring that they are not lost in the event of a system failure.
3. Flexibility: It supports multiple messaging protocols, including AMQP, STOMP, and MQTT, allowing it to integrate with a wide range of systems and applications.
4. Extensibility: It is highly customizable and can be extended with plugins and custom message-processing logic.

The kit provides an implementation of queueing using RabbitMQ, the most widely deployed open-source message broker that allows multiple applications to communicate with each other through queues.

To start the worker that processes messages in the queue, run the command:

1. `npm run infrastructure:start` - starts the RabbitMQ server (you can skip this if you already ran this command)
2. `npm run queue:run` - starts the queue worker

This should start a process that listens for messages in our queue and processes them, see the `queue/worker.ts` file to modify it to your needs:

```javascript
// Listener
channel.consume(AMQP_QUEUE_JOB, (message) => {
	// process queue message here
});
```

The `src/queue/job-generator-handler.ts` file contains the logic for generating a job and adding it to the queue, the `createJobGeneratorHandler` function creates an Express request handler that accepts a message and adds it to the queue. The `createQueueChannel` function sets up a connection to the RabbitMQ server and returns a channel object, which is used to perform various actions on the queue, such as creating a new queue, binding it to an exchange, and publishing a message to the queue.

To use this implementation of queueing, you can send a `POST` request to the `/example-job` endpoint with a `message` in the request body, and the message will be added to the queue. Once the message is in the queue, it will be processed in the order it was added

```bash
curl -X POST http://localhost:4001/example-job
   -H "Content-Type: application/json"
   -d '{"message": "simple queue message!"}'
```

### Caching

To reduce API response times and [rate limiting](https://en.wikipedia.org/wiki/Rate_limiting), you can cache your data so that the application makes a single request to an API, and all the subsequent data requests will retrieve the data from the cache. We use Redis, an in-memory database that stores data in the server memory, to counter our response problems.

We set up Redis by creating a Redis client with the `createClient` function from the `redis` package. Each entity has optional caching. This can be achieved by passing the Redis client with the TTL(time to live) in the `src\graphql\server-context\server-context-middleware-options.ts`.

### Testing

Testing is set up with [Jest](https://jestjs.io/). You can see some example spec files under `src/graphql/schema/technology`.

## Deployment

To deploy this starter kit to production, you will need to choose a cloud provider or hosting service, such as AWS, Google Cloud Platform, Heroku, or DigitalOcean, to host your application. The exact deployment steps will depend on your chosen provider or service, but generally, the following steps will be involved:

1. Prepare your application for deployment by running any necessary build or compile steps. In this case, you can run the `build` script by running `npm run build` which will transpile TypeScript code to JavaScript.
   ```sh
    npm run build
   ```
2. Create a production-ready database, cache and queueing infrastructure, by running
   ```sh
    npm run infrastructure:start
   ```
3. Deploy your application to your chosen provider or service using their deployment tools or services. You can use the start script to start your application in production mode. You may also need to configure any necessary proxy or routing rules to direct incoming traffic to your application.

4. Monitor your application for any issues or errors and adjust your deployment as needed. This may involve configuring load balancers, auto-scaling, or other performance optimization features, depending on your chosen provider or service.
