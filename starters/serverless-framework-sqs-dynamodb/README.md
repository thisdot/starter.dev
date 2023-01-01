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
- [Jest](#jest)
- [Deployment](#deployment)

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

- `build` bundles the project using the serverless packaging serverless. The produced artifacts will ship bundles shipped to AWS on deployment. You can optionally pass `--analyze <function name>` to run the bundle analyzer and visualize the results to understand your handler bundles.
- `deploy` ships the project to the configured AWS account using the Serverless Framework CLI command.
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

- `db` contains seed files for database initialization using the `db:seed` script
- `src/handlers` contains Lambda function handlers referenced by the Serverless Configuration.
- `src/models` contains directories of different data models used by the project and exports all available methods.
- `src/types` contains all TypeScript types for the project.
- `src/utils` contains utility functions and wrappers.
- `serverless.ts` - the Serverless Configuration

**Note:** All tests are co-located with their implementation files.

## Serverless Configuration

This kit uses the TypeScript option for configuration. It is type checked using the `@serverless/typescript` definitions over the DefinitelyTyped definitions because DefinitelyTyped is currently behind on its definition. However, the `@serverless/typescript` types have known issues with certain fields are noted directly in the configuration.

It is not compatible with the automated CI/CD of the Serverless Dashboard as they only support the default YAML format. You can read more about [setting up CI/CD using GitHub for this project on the This Dot blog](https://www.thisdot.co/blog/github-actions-for-serverless-framework-deployments).

### Key Fields to Note

#### `profile`

This is left blank and will default to use your system configured AWS default profile. If you want to use a custom profile, set this field with the name of the profile used. This should ideally be selected based on the AWS organization used.

#### `httpApi.cors`

This setting was enabled out of the box to help with development quickly. Ideally, these CORS settings should be more restrictive in production environments. You can read more about [this option in the official docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/#cors-setup).

#### Defined Stages

This project comes configured with 3 default stages: `dev`, `staging`, `production`.

- `dev` should be used for local development. If you need a shared dev environment for your team, it is recommended to add a new `local` stage for local dev and promote `dev` to the shared deployment stage value.
- `staging` should be the pre-production staging environment for all changes.
- `production` should be the production environment.

#### esbuild

This project uses [serverless-esbuild](https://www.npmjs.com/package/serverless-esbuild) over its webpack counterpart. The esbuild tool chain is generally faster and requires less dependencies to work out of the box.

#### Bundle Analyzer

This project ships with the [serverless-analyze-bundle-plugin](https://www.npmjs.com/package/serverless-analyze-bundle-plugin) to allow you to visualize your Lambda bundles. This is an especially important factor when dealing with cold starts and should be monitored. To analyze a function bundle, run `yarn build --analyze <functionName>`. This will give you a visualization of your function's dependencies and their sizes.

#### File Patterns

Barrel files are not used as they increase the size of the final output bundle due to [how esbuild interprets these types of files](https://github.com/evanw/esbuild/issues/2164). As such, it is recommended to split usable chunks of code into individually packaged files and directly imported for use.

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

## Jest

All test files are co-located with their implementations. There are no integration or e2e tests implemented for this project. All tests are implemented as unit tests.

### Stubbed Databases

Both Redis and DynamoDB are fully stubbed in the tests.

Redis is fully stubbed because it does not have the concept of environments or tables so it would require 2 instances to be running. Redis can easily be mocked in memory and there are several existing solutions for this problem. We're using [ioredis](https://github.com/luin/ioredis) for our implementation and its related [ioredis-mock](https://github.com/stipsan/ioredis-mock).

There is an existing [DynamoDB Local preset for Jest](https://github.com/shelfio/jest-dynamodb). However, it indiscriminately clears the entire database before and after all tests are run. We've [submitted a PR to fix this problem](https://github.com/shelfio/jest-dynamodb/pull/190) which we can utilize once released. In the meantime, we're stubbing the DynamoDB during testing using the [aws-sdk-client-mock](https://github.com/m-radzikowski/aws-sdk-client-mock) to stub the AWS JS v3 SDK.

## Deployment

As a serverless implementation, most of the infrastructure will be deployed and configured correctly simply utilizing the `deploy` script provided by this kit which is just an alias for [`serverless deploy`](https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy). However, the Redis instance is not configurable via the Serverless Configuration and will need to be set up ahead of your first deploy and configured via environment variables. We recommend using [Serverless Framework's interface for AWS Secret Manager](https://www.serverless.com/blog/aws-secrets-management/) for security purposes.

This entire stack can be deployed via CI tools such as GitHub Actions, CircleCI, etc. and is our recommended approach as this kit is incompatible with the Serverless Dashboard. The Serverless Dashboard CI only works with the configuration in the YAML format which we do not use to give developers type-safety in the config file.
