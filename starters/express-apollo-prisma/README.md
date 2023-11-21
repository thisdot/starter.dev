# express-apollo-prisma starter kit

This starter kit features Express, Apollo Server and Prisma.

## Overview

### Tech Stack

- [Express v4](https://expressjs.com)
- [Apollo Server v4](https://www.apollographql.com/docs/apollo-server/)
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
npm create @this-dot/starter -- --kit express-apollo-prisma
```

or

```bash
yarn create @this-dot/starter --kit express-apollo-prisma
```

Note: Other package managers such as `yarn` or `pnpm` can be used with this kit.

- Follow the prompts to select the `express-apollo-prisma` starter kit and name your new project.
- `cd` into your project directory and run `npm install`.
- Make sure you have `docker` & `docker-compose` installed on your machine.
- Create a `.env` file and copy the contents of `.env.example` into it.
- Run `npm run infrastructure:up` to start the database and the Redis instances.
- Run `npm run start` to start the development server.
- Open your browser to `http://localhost:4001` to see the API documentation with the existing endpoints.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/express-apollo-prisma` directory to the name of your new project.
- Make sure you have Docker & Docker Compose installed on your machine.
- `cd` into your project directory and run `npm install`.
- Create a `.env` file and copy the contents of `.env.example` into it.
- Run `npm run infrastructure:up` to start the database and the Redis instances.
- Run `npm run start` to start the development server.
- Open your browser to `http://localhost:4001` to see the API documentation with the existing endpoints.

## Built-in Scripts

- `npm run infrastructure:up` - Creates and starts all the Docker containers for services from Docker Compose configuration (MySQL, Redis, RabbitMQ).
- `npm run infrastructure:pause` - Stops running containers without removing them. They can be started again with `npm run infrastructure:up`.
- `npm run infrastructure:down` - Stops and removes containers, networks and volumes of all the services created by `npm run infrastructure:up`.
- `npm run prepare` - Generates GraphQL and Prisma Client code.
- `npm run db:seed` - Populates the database with basic data for validating and using the application in a development environment (see [Seeding](#seeding)).
- `npm run build` - Compiles the project. Emits files referenced in with the compiler settings from tsconfig.build.json.
- `npm test` - Prepares and runs the unit tests.
- `npm start` - Prepares and starts the development server by automatically restarting the node application when file changes in the `src` directory are detected. Best for the first run (requires: `npm run infrastructure:up`).
- `npm run dev:test` - Runs the unit tests.
- `npm run dev:start` - Starts the development server by automatically restarting the node application when a file changes in the `src` directory are detected (requires: `npm run infrastructure:up`, `npm run prepare`).
- `npm run lint` - Identifying and reporting on patterns found in the project code, to make the code more consistent and avoid bugs.
- `npm run format` - Formats all files supported by Prettier in the project directory and its subdirectories.
- `npm run prisma:format` - Formats the Prisma schema file, which includes validating, formatting, and persisting the schema.
- `npm run prisma:migrate:reset` - Drops and recreates the database, which results in data loss (for development only).
- `npm run prisma:migrate:dev` - Updates your database using migrations during development and creates the database if it does not exist (for development only).
- `npm run prisma:generate` - Generates Prisma Client code.
- `npm run prisma:deploy` - Applies all pending migrations, and creates the database if it does not exist. Primarily used in non-development environments (for production only).
- `npm run queue:run` - Queue runner script. Runs the queue worker.

## Environment Variables

- `PORT` - The port exposed to connect with the application.
- `DATABASE_URL` - The database connection URL.
- `REDIS_URL` - The Redis connection URL.
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
- `CORS_ALLOWED_ORIGINS` - (Optional) Comma separated Allowed Origins. Default value: '\*'. (See [CORS Cross-Origin Resource Sharing](#cors-cross-origin-resource-sharing))

We map TCP port `DOCKER_MYSQLDB_PORT_CONTAINER` in the container to port `DOCKER_MYSQLDB_PORT_LOCAL` on the Docker host.
We also map TCP port `DOCKER_REDIS_PORT_LOCAL` in the container to port `DOCKER_REDIS_PORT_CONTAINER` on the Docker host.

To ensure proper connection to our resources
For more information on Docker container networks: https://docs.docker.com/config/containers/container-networking/

### Database and Redis

To start up your API in development mode with an active database connection, please follow the following steps:

1. create a `.env` file. For the defaults, copy the contents of the `.env.example` file's content into it.
2. run `npm run infrastructure:up`.
3. run `npm run dev`.

The above steps will make sure your API connects to the database and Redis instances that get started up with Docker. Run `npm run infrastructure:down` to stop your MySQL, Redis & RabbitMQ containers.

### Seeding

To seed the database, you need to do the following steps:

1. Create a `.env` file. For the defaults, copy the contents of the `.env.example` file into it.
2. Run the command: `npm run infrastructure:up`.
3. Run the command: `npm run db:seed`.

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

![Prisma Generate](https://github.com/thisdot/starter.dev/raw/main/starters/express-apollo-prisma/screenshots/prisma_generate.png)

This will generate a migration folder under `prisma/migrations`. That alters our database schema.

![authorName migration](https://github.com/thisdot/starter.dev/raw/main/starters/express-apollo-prisma/screenshots/authorName_migration.png)

3. Update your GraphQL type definitions for the `Technology` entity `src/endpoints/graphql/schema/technology/technology.typedefs.ts` with the new `authorName` property.

```ts
import gql from 'graphql-tag';

export const technologyTypeDefs = gql`
"""
Technology object
"""
type Technology {
	...
	"The author of the technology"
	authorName: String
}

...

input CreateTechnology {
	...
	"The author of the technology"
	authorName: String
}

input UpdateTechnology {
	...
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

4. Update our automatically generated code by running `npm run codegen`. This will generate a new `src/endpoints/graphql/schema/index.ts` file.

```sh
npm run codegen
```

5. Finally, update your resolvers with updated properties you'd like to be returned by GraphQL.

### Pagination

There is a `technologies` query in `technology.typedefs.ts` file. The query uses offset pagination for querying results. It is a place for configuring the pagination defaults. Current defaults:

- limit: 5
- offset: 0

```graphql
	...
  type Query {
		...
		"Returns a list of Technologies"
		technologies(limit: Int = 5, offset: Int = 0): TechnologyCollectionPage!
	}
  ...
```

### Production build

The `npm run build` command compiles the TypeScript code into the `/dist` folder and generates a `package.json` file. To use it in production, for example in a Docker container, one would copy the contents of the `/dist` folder, and then run `npm install` to have all the dependencies.

### CORS Cross-Origin Resource Sharing

The [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) standard works by adding new HTTP headers that let servers describe which origins are permitted to read that information from a web browser. For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. This means that you cannot request data from web applications on 'https://domain-a.com' from 'https://domain-b.com/data.json'.

This application accepts CORS from all origins by default. Some web applications may require you to add the HTTP header `'Access-Control-Allow-Origin': '*'` to allow access.

In order to restrict origin URLs that can access your API, you need to add a list of comma-separated origin URLs in the `CORS_ALLOWED_ORIGINS` variable located in your `.env` file. For example `CORS_ALLOWED_ORIGINS="https://starter.dev"`. In case you need to access the API in a development environment i.e. a Sveltekit application, you can add the local URL `http://127.0.0.1` to the `CORS_ALLOWED_ORIGINS` variable as `CORS_ALLOWED_ORIGINS=https://starter.dev,http://127.0.0.1`.

## Project Structure

### Folder structure

```
- **/prisma/** - holds Prisma migrations and schema.
- **/src
  - /endpoints - organizes the server's various endpoints.
    - /graphql - holds GraphQL-related files.
      - /data-sources/** - holds data sources per model.
      - /mappers/** - holds mappers per model.
      - /schema/** - holds GraphQL schema type definitions and resolvers.
      - /server-context/** - holds server-context types and middleware factory methods.
    - /health/** - contains health check related files for monitoring server status.
    - /job-generator/** - holds files for implementating queueing using RabbitMQ.
  - /lib -
    - /cache/** - holds cache-related functionality.
    - /db - holds prisma-related files.
      - migrations/** - holds prisma auto-generated migration files.
      - schema.prisma - holds prisma database models and configuration.
      - seed.ts - holds database seeding configuration.
  - /mocks/** - holds mock data files for testing purposes with predefined data.
  - main.ts - bootstraps the entire server.
```

This file structure approach emphasizes modularity and separation of concerns. By categorizing files based on their functionality, it becomes easier to understand, maintain, and scale the project. Having separate folders for endpoints, data sources, mappers, and schema definitions improves code organization and readability. The addition of a `lib` directory for utility functions and helpers also promotes code reusability.

### GraphQL Modules

This pattern follows the single responsibility principle since each file has one purpose. For example, the `*.resolvers.ts` files handle data for all resolvers with the functionality related to data fetching for your query. The `*.spec.ts` files handle all the unit tests for the resolvers. The `*.typedefs.ts` files handle all the types for GraphQL.

#### Example GraphQL Module

- `technologies.resolvers.ts` - Resolvers for the Technology entity.
- `technologies.spec.ts` - Unit tests for the Technology entity.
- `technologies.typedefs.ts` - Type definitions for the Technology entity.

## Technologies

### Express

The ExpressJS API starts at the `main.ts` file.

### Apollo Server

Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client. It's the best way to build a production-ready, self-documenting GraphQL API that can use data from any source.

We use the [`expressMiddleware`](https://www.apollographql.com/docs/apollo-server/api/express-middleware#expressmiddleware) function from `@apollo/server` to enable you to attach Apollo Server to an Express server. We also recommend using [`ApolloServerPluginDrainHttpServer`](https://www.apollographql.com/docs/apollo-server/api/plugin/drain-http-server) plugin to ensure your server gracefully shuts down.

The data sources are located in `src/endpoints/graphql/data-sources`. The data sources of the entities are passed in `src\graphql\server-context\server-context-middleware-options.ts`.

### ORM

The kit uses Prisma as a TypeScript ORM for proper data fetch and mutation from the source. It is configured with the following environment variable: `DATABASE_URL="mysql://root:root@localhost:3307/testdb"`.

We use Prisma for the following:

- [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client) - an auto-generated and type-safe database client for use in your application.
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate) - a declarative data modeling and migration tool.

Learn more about [Prisma](https://www.prisma.io/docs/concepts/overview/prisma-in-your-stack/is-prisma-an-orm).

### Queueing

The kit provides an implementation of queueing using RabbitMQ, an open-source message broker that allows multiple applications or services to communicate with each other through queues. It's a powerful tool for handling tasks asynchronously and distributing workloads across multiple machines.

To start the worker that processes messages in the queue, run the command:

1. `npm run infrastructure:up` - starts the RabbitMQ server (you can skip this if you already ran this command).
2. `npm run queue:run` - starts the queue worker.

This should start a process that listens for messages in our queue and processes them, see the `queue/worker.ts` file to modify it to your needs:

```javascript
// Listener
channel.consume(AMQP_QUEUE_JOB, (message) => {
	// process queue message here
});
```

The `src/endpoints/job-generator/job-generator-handler.ts` file contains the logic for generating a job and adding it to the queue for processing, the `jobGeneratorHandler` function is an Express request handler that accepts a message and adds it to the queue.

To use this implementation of queueing, you can send a `POST` request to the `/example-job` endpoint with a `message` in the request body, and the message will be added to the queue. Once the message is in the queue, it will be processed in the order it was added:

```bash
curl -X POST http://localhost:4001/example-job
   -H "Content-Type: application/json"
   -d '{"message": "simple queue message!"}'
```

### Caching

To reduce API response times and [rate limiting](https://en.wikipedia.org/wiki/Rate_limiting), you can cache your data so that the application makes a single request to an API, and all the subsequent data requests will retrieve the data from the cache. We use Redis, an in-memory database that stores data in the server memory, to counter our response problems.

We set up Redis by creating a Redis client with the `createClient` function from the `redis` package. Each entity has optional caching. This can be achieved by passing the Redis client with the TTL(time to live) in the `src\graphql\server-context\server-context-middleware-options.ts`.

### Testing

Testing is set up with [Jest](https://jestjs.io/). You can see some example spec files under `src/endpoints/graphql/schema/technology`.

## Deployment

To deploy this starter kit to production, you will need to choose a cloud provider or hosting service, such as AWS, Google Cloud Platform, Heroku, or DigitalOcean, to host your application. The exact deployment steps will depend on your chosen provider or service, but generally, the following steps will be involved:

1. Prepare your application for deployment by running any necessary build or compile steps. In this case, you can run the `build` script by running `npm run build` which will transpile TypeScript code to JavaScript:

```bash
npm run build
```

2. Create a production-ready database, cache and queueing infrastructure, by running:

```bash
npm run infrastructure:up
```

3. Deploy your application to your chosen provider or service using their deployment tools or services. You can use the start script to start your application in production mode. You may also need to configure any necessary proxy or routing rules to direct incoming traffic to your application.

4. Monitor your application for any issues or errors and adjust your deployment as needed. This may involve configuring load balancers, auto-scaling, or other performance optimization features, depending on your chosen provider or service.
