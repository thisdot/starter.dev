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

In the `src/db/run_seeders.ts` file, we provide a script to seed the database with intial values, using Deno DB. Under the `src/db/seeding` folder, you can find the `technologySeedData`, which is an array of initial values to be seeded into the database as an example.

In order to seed the database, the database docker container must be up and running:

```shell
docker compose up
```

When the database is running, set up your `.env` file to provide the necessary environment variables for the database connection, then run your seeder:

```shell
 deno run --allow-net --allow-env --allow-read ./src/db/run_seeder.ts
```

## Running application locally

To run locally:

```shell
deno run --watch --allow-net --allow-env --allow-read ./src/main.ts
```

### Keeping integrity through lock file

The starter kit ships without a lock file, but the recommended way of keeping the integrity of dependencies is through a lock file. You can write a lock file through the following commands:

```shell
deno cache --lock=lock.json --lock-write deps.ts
deno cache --lock=lock.json --lock-write dev_deps.ts
```

Other collaborators can then use the lock file to download the dependencies before running the app:

```shell
deno cache --reload --lock=lock.json deps.ts
deno cache --reload --lock=lock.json dev_deps.ts
```

### Run configurations

If you use WebStorm, you can take advantage of the run configuration that is stored in the `.run` folder. That way, you can start the application using a preconfigured run command.

## Generating documentation

For generating documentation, we use Deno's built-in `deno doc` command. This command accepts an argument, which is a a module for which the documentation should be generated. As we have multiple modules, there is one "aggregator" module in the `src/docs/sources` folder that is used to aggregate all the modules for the documentation.

The documentation is generated using the command:

```shell
deno doc src/docs/sources.ts
```

The documentation is printed to standard out - it can be redirected to a file if necessary.
