# Serverless Framework, SQS, DynamoDB Kit

## Table of contents

- [Overview](#overview)
- [Installation](#installation)
  - [Pre-requisites](#pre-requisites)
  - [CLI (Recommended)](#cli-recommended)
  - [Manual](#manual)
  - [Getting Started](#getting-started)
- [Available Commands](#available-commands)
  - [General Commands](#general-commands)
  - [DynamoDB Commands](#dynamodb-commands)
  - [Infrastructure Commands](#infrastructure-commands)
- [DynamoDB](#dynamodb)

## Overview

A starter kit utilizing the Serverless Framework in conjunction with AWS DynamoDB & SQS. This kit aims to establish a baseline Serverless Framework project with reasonable configurations that is as-is deployable to AWS. It also provides a fully offline development mode for rapid iteration.

## Installation

### Pre-requisites

- Node.js v16
- npm or yarn or pnpm
- Docker & docker-compose

### CLI (Recommended)

1. Init the project

```shell
npm create @this-dot/starter -- --kit serverless-framework-sqs-dynamodb
```

or

```shell
yarn create @this-dot/starter -- --kit serverless-framework-sqs-dynamodb
```

2. Follow the prompt to name your new project.
3. `cd` into your project directory.

### Manual

1. Clone the starter.dev repo

```shell
git clone https://github.com/thisdot/starter.dev.git
```

2. Copy and rename the `starters/serverless-framework-sqs-dynamodb` directory to the name of your new project.
3. `cd` into your project directory

### Getting Started

This README uses `yarn` for commands. If you're using `npm` or `pnpm`, utilize the equivalent version of the commands.

1. Create a `.env` file:

```bash
cp .env.example .env
```

2. Run `yarn` to install deps
3. Standup the project infrastructure using docker via:

```bash
yarn infrastructure:up
```

4. Sync database tables and seed the project via:

```bash
yarn db:sync
yarn db:seed
```

5. Start the local development server:

```bash
yarn start
```

6. Make changes and enjoy building your new backend!

## Available Commands

### General Commands

- `build` bundles the project using the serverless packaging serverless. The produced artifacts will ship bundles shipped to AWS on deployment. You can optionally pass `--analyze <function name>` to run the bundle analzyer and visualize the results to understand your handler bundles.
- `start` runs the `serverless-offline` provided server for local development and testing. Be sure to have the local docker infrastructure running to emulate the related services.
- `test` runs `jest` under the hood.
- `lint` runs `eslint` under the hood. You can use all the eslint available command line arguments. To lint the entire project, run `yarn lint .`, or equivalent. You can affix `--fix` to auto-correct linting issues that eslint can handle.
- `format:check` runs prettier format checking on all project files.
- `format:write` runs prettier format writing on all project files.

### DynamoDB Commands

- `db:sync` syncs all table definitions with DynamoDB instance to ensure resources are correct. Will output warnings for pre-existing tables.
- `db:seed` adds seed data to the DynamoDB. See https://github.com/99x/serverless-dynamodb-local#seeding-sls-dynamodb-seed for more information.

### Infrastructure Commands

- `infrastructure:up` creates docker container and related images and runs them in the background. This should only be needed once during initial setup.
- `infrastructure:down` deletes the docker container and related images.
- `infrastructure:start` starts the docker container.
- `infrastructure:stop` stops the docker container.

## Project Structure

TODO: insert tree structure

## Serverless Configuration

This kit uses the TypeScript option for configuration. It is type checked using the `@serverless/typescript` definitions over the DefinitelyTyped definitions because DefinitelyTyped is currently behind on its definition. However, the `@serverless/typescript` types have known issues with certain fields are noted directly in the configuration.

Things to note:

- profile field
- httpApi cors
- defined stages: dev, staging, production
- esbuild
- bundle analyzer
- package patterns

## DynamoDB

This kit utilizes [AWS DynamoDB](https://aws.amazon.com/dynamodb/) for data persistence. It uses the [serverless-dynamodb-local](https://github.com/99x/serverless-dynamodb-local) plugin for table creation and seeding. The rest of the database is run via docker-compose using the `amazon/dynamodb-local` image.

To help manage the database locally, the [`aaronshaf/dynamodb-admin`](https://github.com/aaronshaf/dynamodb-admin) image is used to provide an GUI interface for managing your database. After the infrastructure is stood up, you can visit the admin tool locally at http://localhost:8001/.

### Defining New Tables

To create a new table, define it via the `serverless.ts` resources section. It utilizes the [DynamoDB Cloudformation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html) to define data. Table names should be defined per environment through the Serverless `params` config. Once your table is defined, use the `yarn db:sync` command to create the table.

### Defining New Seeds

Seed files should be placed in the `db` directory. They can be formatted as JSON or raw AWS AttributeValues. The seed files should be added to the `custom.dynamodb.seed` section of the config. The `seed` key takes seed target groups which contain a list of source objects for your seed data. Target groups can be arbitrarily named per your needs, but the structure should be:

```typescript
seed: {
	// example target group
	core: {
		sources: [
			{
				table: '<your table name>',
				sources: ['<path to relevant seed file(s)'],
			},
		];
	}
}
```

Once defined, run `yarn db:seed` to seed your database. See https://github.com/99x/serverless-dynamodb-local#seeding-sls-dynamodb-seed for more information.
