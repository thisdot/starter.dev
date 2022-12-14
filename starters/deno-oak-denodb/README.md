# deno-oak-denodb starter kit

This starter kit can be used for scaffolding an all-Deno based backend. It uses the following technologies:

- [Deno](https://deno.land/) as the runtime
- [Oak](https://deno.land/x/oak) as the web server
- [Oak GraphQL](https://deno.land/x/oak_graphql) as the API
- [DenoDB](https://deno.land/x/denodb) as the ORM
- [Redis](https://deno.land/x/redis) for caching
- PostgreSQL as a relational database

## Installation

### CLI (Recommended)

```
npm create @this-dot/starter --kit deno-oak-denodb
```

or

```
yarn create @this-dot/starter --kit deno-oak-denodb
```

- Follow the prompts to select the `deno-oak-denodb` starter kit and name your new project.
- `cd` into your project directory.
- Make sure you have Docker & docker-compose installed on your machine
- Create a `.env` file and copy the contents of `.env.example` into it.
- Run `deno task start-db` to start the local PostgreSQL and Redis
- Run `deno task start-web` to start the development server.
- Open your browser to `http://localhost:3333/health` to see the API running.
- Proceed to the [Seeding](#seeding) chapter to seed the database with some sample data.

### Manual

```
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/deno-oak-denodb` directory to the name of your new project.
- Make sure you have Docker & docker-compose installed on your machine
- `cd` into your project directory.
- Create a `.env` file and copy the contents of `.env.example` into it.
- Run `deno task start-db` to start the local PostgreSQL and Redis
- Run `deno task start-web` to start the development server.
- Open your browser to `http://localhost:3333/health` to see the API running.
- Proceed to the [Seeding](#seeding) chapter to seed the database with some sample data.

### Seeding

In the `src/db/run_seeders.ts` file, we provide a script to seed the database with initial values, using Deno DB. Under the `src/db/seeding` folder, you can find the `technologySeedData`, which is an array of initial values to be seeded into the database as an example.

In order to seed the database, the database Docker container must be up and running using `deno task start-db`. When the database is running, run the following command:

```shell
deno task seed
```

## Available commands

### Tasks

Deno supports [tasks](https://deno.land/manual@v1.28.3/tools/task_runner) which can execute simple or complex commands. These tasks are included as part of the starter kit:

- `start-db` starts the local PostgreSQL and Redis
- `stop-db` stops the local PostgreSQL and Redis
- `start-web` starts the web server
- `start-all` starts both the databases and the web server
- `seed` seeds the PostgreSQL database with some sample data
- `write-lock-file` writes the lock file for checking integrity of packages (see the [dedicated chapter](#keeping-integrity-through-lock-file) for details)
- `reload-cache` re-downloads the dependencies to the cache
- `show-docs` shows the JSDoc-based documentation from the code (see the [dedicated chapter](#generating-documentation) for details)
- `generate-type-definition` generates TypeScript types from the GraphQL schema (see the [dedicated chapter](#generating-typescript-files-from-graphql-schema) for details)

### Formatting and linting

For formatting and linting, we use Deno's built-in commands.

To run the linting on the project:

```shell
deno lint
```

To format the files before pushing code:

```shell
deno fmt
```

### Testing

Deno will execute all tests by running:

```
deno test
```

This will find any tests with the following glob pattern:

- files named `test.{ts, tsx, mts, js, mjs, jsx, cjs, cts}`,
- or files ending with `.test.{ts, tsx, mts, js, mjs, jsx, cjs, cts}`,
- or files ending with `_test.{ts, tsx, mts, js, mjs, jsx, cjs, cts}`

Deno will collect test coverage into a directory for your code if you specify the `--coverage` flag when starting `deno test`. For example:

```
# Collect your coverage profile with deno test --coverage=<output_directory>
deno test --coverage=cov_profile
```

### Keeping integrity through lock file

The starter kit ships without a lock file, but the recommended way of keeping the integrity of dependencies is through a lock file. You can write a lock file through the following commands:

```shell
deno task write-lock-file
```

Other collaborators can then use the lock file to download the dependencies before running the app:

```shell
deno task reload-cache
```

### Generating documentation

For generating documentation, we use Deno's built-in `deno doc` command. This command accepts an argument, which is a a module for which the documentation should be generated. As we have multiple modules, there is one "aggregator" module in the `src/docs/sources` folder that is used to aggregate all the modules for the documentation.

The documentation is generated using the command:

```shell
deno task show-docs
```

The documentation is printed to standard out - it can be redirected to a file if necessary.

### Generating TypeScript files from GraphQL schema

Currently, there are no stable Deno modules for generating TypeScript types from a GraphQL schema. Therefore, we've used an npm package for this as can be seen in the `src/tools/generate_type_definition.ts` file:

```typescript
import { CodegenConfig, generate } from 'npm:@graphql-codegen/cli';
import 'npm:@graphql-codegen/typescript';
import 'npm:@graphql-codegen/typescript-resolvers';

//...
```

This can also be a good example of how you can use npm packages elsewhere in the code.

Whenever you change the GraphQL schema (located in `src/graphql/schema`), the types should be re-generated using the command:

```shell
deno task generate-type-definition
```

## Using the GraphQL API

The GraphQL API playground is available at http://localhost:3333/graphql. You can execute the following query to retrieve all technologies, assuming that they were seeded properly.

```graphql
{
  getTechnologies {
    id
    displayName
    description
    url
    createdAt
    updatedAt
  }
}
```

The playground is disabled when the `PRODUCTION` environment variable is set to `true`.

## CORS configuration

In order to restrict origin URLs that can access your API, you need to add a list of comma separated origin URLs in the `CORS_ALLOWED_ORIGINS` variable located in your `.env` file. For example `CORS_ALLOWED_ORIGINS=https://starter.dev`. In case you need to access the API in a development environment, you can add the local url http://127.0.0.1 to the `CORS_ALLOWED_ORIGINS` variable as `CORS_ALLOWED_ORIGINS=https://starter.dev,http://127.0.0.1`.

## Kit organization / architecture

This starter kit has the following structure in the src folder:

- `__tests__` contains all the tests, but the tests can also be co-located with the modules they test.
- `cache`: a thin wrapper around Redis used for caching purposes.
- `config` contains a parser for the environment variables
- `db` contains ORM-specific code as well as a seeding script. ORM models are stored in the `db/model` directory, while the `db/repository` directory contains a thin wrapper for interacting with ORM methods. That way, if you will ever need to change the ORM or use queries directly, you only need to update the repository code.
- `docs` contains a module that aggregates all other modules which contain JSDoc-based comments. The command for generating documentation will use this module.
- `graphql` contains the schema, the TypeScript interfaces used in the schema, as well as GraphQL resolvers.
- `rest` contains only the health endpoint. Should you need to use a REST API instead, you can use this health endpoint as an example for building a REST API.
- `util` contains various utility functions.

### Expanding further

When building more advanced web apps, you may need to expand the project further to include authentication and templating.

#### Authentication

The most common approach to implementing authentication is by using JSON Web Tokens. The API would need to be expanded with methods to create and validate JWTs. The most popular library for implementing JWTs is [djwt](https://deno.land/x/djwt). The official Oak website has an [example](https://github.com/22mahmoud/deno_crud_jwt) on implementing JTWs using Oak.

#### Templating

This starter kit is an example of how to build an API on top of Deno. If you need to go further and render views using Oak, there's a very good view engine conveniently named [View Engine](https://github.com/deligenius/view-engine) which supports multiple templating engines such as [Denjucks](https://github.com/denjucks/denjucks), [Eta](https://github.com/eta-dev/eta), [Handlebars](https://handlebarsjs.com/), and [dejs](https://github.com/syumai/dejs).

## Deployment

[Deno Deploy](https://deno.com/deploy) is far the most popular platform for deploying Deno applications. To use it, all you need to integrate with your GitHub repository and specify the entrypoint for the application.

You can use an alternative platform as well, as long as it has support for the Deno runtime. If it doesn't, you can also deploy the app using Docker, provided that the platform supports containerized deployments. There's a `Dockerfile` in the root of the starter kit for your convenience.

