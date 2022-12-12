# deno-oak-denodb starter kit

This starter kit features a basic tech stack to build a Deno-based backend.

## Formatting and linting

To run the linting on the project:

```shell
deno lint
```

To format the files before pushing code:

```shell
deno fmt
```

## Seeding

In the `src/db/run_seeders.ts` file, we provide a script to seed the database with initial values, using Deno DB. Under the `src/db/seeding` folder, you can find the `technologySeedData`, which is an array of initial values to be seeded into the database as an example.

In order to seed the database, the database docker container must be up and running:

```shell
deno task start-db
```

When the database is running, set up your `.env` file to provide the necessary environment variables for the database connection, then run your seeder:

```shell
deno task seed
```

You can then run `docker compose stop` to shut down the database. The database will be started automatically by `deno task start-all` (see next section).

## Running application locally

To run locally, start the database, then start the web server:

```shell
deno task start-db
deno task start-web
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

## Generating documentation

For generating documentation, we use Deno's built-in `deno doc` command. This command accepts an argument, which is a a module for which the documentation should be generated. As we have multiple modules, there is one "aggregator" module in the `src/docs/sources` folder that is used to aggregate all the modules for the documentation.

The documentation is generated using the command:

```shell
deno task show-docs
```

The documentation is printed to standard out - it can be redirected to a file if necessary.

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

## CORS configuration

In order to restrict origin URLs that can access your API, you need to add a list of comma separated origin URLs in the `CORS_ALLOWED_ORIGINS` variable located in your `.env` file. For example `CORS_ALLOWED_ORIGINS=https://starter.dev`. In case you need to access the API in a development environment, you can add the local url http://127.0.0.1 to the `CORS_ALLOWED_ORIGINS` variable as `CORS_ALLOWED_ORIGINS=https://starter.dev,http://127.0.0.1`.


