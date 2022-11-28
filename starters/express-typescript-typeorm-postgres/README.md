# express-typescript-typeorm-postgres starter kit

This starter kit features Express, Typescript API setup

## Table of Contents

- [express-typescript-typeorm-postgres starter kit](#express-typescript-typeorm-postgres-starter-kit)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Included Tooling](#included-tooling)
    - [Example Components](#example-components)
  - [Installation](#installation)
    - [CLI (Recommended)](#cli-recommended)
    - [Manual](#manual)
  - [Commands](#commands)
  - [Kit Organization / Architecture](#kit-organization--architecture)
    - [Example directory](#example-directory)
  - [Demo Implementation](#demo-implementation)

## Overview

### Tech Stack

- [Express v4](https://expressjs.com)
- [TypeOrm](https://typeorm.io)
- [PostgreSQL](https://www.postgresql.org)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Controllers

TODO: set up example controllers

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
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/express-typescript-typeorm-postgres` directory to the name of your new project.
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the server.

[//]: # (- TODO: #534 this needs to be pointing towards the swagger documentation)
- Open your browser to `http://localhost:3333/swagger` to see the included example code running.

## Commands

- `npm run db:init` - Builds the docker container image with database seeding.
- `npm run db:start` - Starts the database using the previously built docker container.
- `npm run db:stop` - Stops the running database docker container.
- `npm run db:delete` - Deletes everything database related and allows you to reinitialise your database.
- `npm run dev` - Starts the development server. (Needs a running database first)
- `npm run build` - Builds the app.
- `npm start` - Starts the built app. (Needs a running database first)
- `npm test` - Runs the unit tests.
- `npm run lint` - Runs ESLint on the project.
- `npm run format` - Formats code for the entire project

## Database

In order to start up your API in dev mode with an active database connection, please follow the following steps:

1. create a `.env` file. For the defaults, copy the contents of the `.env.example` file's content into it.
2. run `npm run db:init`
3. run `npm run db:start`

The above steps will make sure your API connects to the database instance that gets started up with docker. When you finish work, run `npm run db:stop` to stop your database container.

### Seeding

Mounting the `tools/db` folder with the `-v $PWD/tools/db:/docker-entrypoint-initdb.d` flag, when we create the docker image, will run every `.sql` file it finds, in alphabetical order.

You can pre-seed your database by providing .sql files that set up the schemas, tables and data for your development needs. `npm run db:init` or on windows `npm run db:init:windows` will do that for you.

For local development, we also mount the `pg_data` folder with the `-v $PWD/pg_data:/var/lib/postgresql/data` command, therefore, your data is kept locally for you.

Running `npm run db:delete` will delete everything and allows you to re-initialize your database from zero.


## Kit Organization / Architecture

The demo components included in the starter.kit are co-located with the tests and stories. If you want to follow this pattern, take a look at our GitHub demo implementation below. The demo implementation is done with the same structure but includes things like tests, routes, and controllers that are modeled after best practices. Using this structure makes it easy to find all the code and functionality that are related.

### Example directory

```

TODO: example
```

## Demo Implementation

[Repository](https://github.com/thisdot/starter.dev-showcases/tree/main/express-typescript-typeorm-postgres)

TODO: what does the the demo implementation do.
