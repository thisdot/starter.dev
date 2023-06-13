# serverless-framework-apollo-contentful starter kit

This starter kit features **Serverless**, **GraphQL**, **Apollo Server**, and **Contentful**.

## Overview

### Tech Stack

- [GraphQL](https://graphql.org/)
- [Apollo Server v4.x](https://www.apollographql.com/docs/apollo-server/)
- [Serverless v3.x](https://serverless.com/)
- [Contentful CMS](https://www.contentful.com/)
- [Redis](https://redis.com)
- [AWS SQS](https://aws.amazon.com/sqs/)

### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Example Code

- `Technology` query to fetch technology data from Contentful

## Installation

### CLI (Recommended)

```bash
npm create @this-dot/starter -- --kit serverless-framework-apollo-contentful
```

or

```bash
yarn create @this-dot/starter --kit serverless-framework-apollo-contentful
```

or

```bash
pnpm create @this-dot/starter --kit serverless-framework-apollo-contentful
```

- Follow the prompts to select the `serverless-framework-apollo-contentful` starter kit and name your new project.
- `cd` into your project directory and run `npm install`.
- Configure your setup using [environment variables](#environment-variables).
- Docker is used to run Redis in the kit. Start up the Docker container with:

```shell
npm run infrastructure:up
```

- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

### Manual

This requires a download of the entire starter.dev repository and extraction of
the `serverless-framework-apollo-contentful` kit from the starters directory.

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/serverless-framework-apollo-contentful` directory to the name of your new project.
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

### Environment variables

The kit can be configured using environment variables. The easiest way to get started it to copy the contents of the file `.env.example` into a new `.env` file.

```bash
cp .env.example .env
```

You would need an account with [contentful.com](http://contentful.com) to get the environment variables required:

```bash
CONTENTFUL_CONTENT_MANAGEMENT_API_TOKEN=xxx
CONTENTFUL_SPACE_ID=xxx
CONTENTFUL_ENVIRONMENT=master
```

#### Steps to set up Contentful

1. Once you're signed in to Contentful create a space

2. When that's done, go to **Settings** -> **API keys**
   Click on **Generate personal token** to get the `CONTENTFUL_CONTENT_MANAGEMENT_API_TOKEN` variable

   ![API tokens](https://github.com/thisdot/starter.dev/raw/main/starters/serverless-framework-apollo-contentful/screenshots/api-tokens.png)

3. Go to **Settings** -> **General settings** to get the `CONTENTFUL_SPACE_ID`

   ![Space ID](https://github.com/thisdot/starter.dev/raw/main/starters/serverless-framework-apollo-contentful/screenshots/space-id.png)

   After you've gotten your API TOKEN and Space ID from contentful, modify the `.env` file and replace the `CONTENTFUL_CONTENT_MANAGEMENT_API_TOKEN` and `CONTENTFUL_SPACE_ID` variables.

4. For demo purposes, this kit comes preconfigured with a `Technology` model. To use this, create the content model for
   it in Contentful. The model has `displayName`, `description` and `url` text fields. The `id` field gets provided by
   Contentful.

   ![content models](https://github.com/thisdot/starter.dev/raw/main/starters/serverless-framework-apollo-contentful/screenshots/content-models.png)

The kit uses Redis for caching, so you would also need the credentials for the Redis server.

```bash
REDIS_USER=default
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASS=
REDIS_CACHE_TTL_SECONDS=900
```

These are the defaults and should work seamlessly if you have Redis running already on your local machine.

## Commands

- `npm run codegen` - Runs Graphql code generator.
- `npm run db:seed` - Seeds Database.
- `npm run deploy` - Deploys your application on `AWS Lambda`.
- `npm run dev` - Starts the development server.
- `npm run format` - Formats code for the entire project.
- `npm run infrastructure:up` - Starts up an ElasticMQ instance for Queueing and Redis instance for caching.
- `npm run infrastructure:pause` - Stops running containers without removing them. They can be started again with `npm run infrastructure:up`.
- `npm run infrastructure:down` - Stops and removes containers, networks and volumes of all the services created by `npm run infrastructure:up`.
- `npm run lint` - Runs ESLint on the project.
- `npm run test` - Runs the unit tests.
- `npm run ts:check` - Run type checking.

### Migration

To manage our Contentful content types via code we implement migration scripts which are located in `scripts/migration`.

How to run migrations:

- First, install `contentful-cli`.

```sh
   npm i -g contentful-cli
```

- Login to Contentful via `contentful-cli`.

```sh
   contentful login
```

- Create a space using `contentful-cli`, if not created yet in Contentful web app.

```sh
   contentful space create --name "ThisDot example"
```

- Set the newly-created space as the default space for all further CLI operations. This will present a list of all available spaces. Choose the one we just created.

```sh
   contentful space use
```

- Migrations are located in `scripts/migrations/**`. Create a migration file here

- Run a migration using the following command

```sh
   contentful space migration scripts/migrations/01-create-technology-contentType.js -y
```

[Learn more on migrations](https://www.contentful.com/developers/docs/tutorials/cli/scripting-migrations/)

#### Demo content

This kit comes with two demo migrations, the first one will add the base setup for our demo Technology model to Contentful. The second one changes the model so one can use the slug editor in Contentful's web interface.

To test our migrations, run `01-*` before `02-*`. When developing your own application, remove the demo migrations and build your own. By prefixing the migration filenames with a number, one can ensure the migrations are ran in the correct order.

### Seeding

To pre-populate the data within contentful we implement seeding scripts which are located in `scripts/seed`.

```sh
npm run db:seed
```

### Queueing

Amazon Simple Queue Service (SQS) is a fully managed message queuing service that enables the decoupling of distributed applications and microservices and ensures reliable and scalable processing of application messages.

In this implementation, an SQS message is sent by the `APIGatewayProxyHandler` in `sqs-generate-job` via the `sendMessage` function, which is then stored in a queue called `DemoJobQueue`. The SQS handler `sqs-handler` polls this queue and processes any message received.

The handler function of `sqs-handler` retrieves the messages from the event parameter passed to it, calls the `recordHandler` function for each record in the event, and logs the message.

The `recordHandler` function processes the individual message by taking the body of the message and logging it.

Note: The demo implementation just logs the body to showcase the message successfully arrived at the handler. A real-world application would parse the message and act on it.

The sendMessage function sends the message to the queue by calling the `SendMessageCommand` of the AWS SDK client for SQS, passing in the queue URL and message body. The function also returns a `SendMessageResult` object that indicates whether the message was successfully sent or not.

The `getQueueUrl` function retrieves the URL of the `DemoJobQueue` by calling the `GetQueueUrlCommand` of the AWS SDK client for SQS, passing in the name of the queue. The URL is then used to send messages to the queue.

The `getClient` function returns an instance of the AWS SDK client for SQS, which is cached to prevent multiple instances from being created.

The `isOffline` function is a utility function that checks whether the functions are being run locally via serverless offline or on infrastructure. This function helps detect which connection string to use.

The `serverless.yml` file contains the configuration for the Serverless Framework, which specifies the service name, runtime, functions to deploy, and the events that trigger them. The configuration also includes IAM role statements that allow the `APIGatewayProxyHandler` in `sqs-generate-job` function to send messages to the `DemoJobQueue` queue. Additionally, it sets up a local SQS server via the `serverless-offline-sqs` plugin for development and testing purposes.

To use this implementation of queueing, you can send a `POST` request to the `/sqs-generate-job` endpoint with a `message` in the request body, and the message will be added to the queue. Once the message is in the queue, it will be processed in the order it was added

```bash
curl -X POST http://localhost:3000/dev/sqs-generate-job \
   -H "Content-Type: application/json" \
   -d '{"message": "simple queue message!"}'
```

### Testing

Testing is set up with `Jest`. You can see some example test files under `src/schema/technology`

To run all tests

```sh
npm run test
```

To run test on one file:

```sh
npm run test filepath
```

## Project Structure

The demo components included in the starter kit are co-located with the tests. This kit includes things like mocks and data-fetching queries that are modeled after an MVC-type architecture. Using this structure makes it easy to find all
the code and functionality related to a specific component. This pattern follows the single responsibility principle
since each file has one purpose. For example, the `.resolvers.ts` files handle data for all resolvers with the
functionality related to data fetching for your query. The `.spec.ts` files handle all the unit tests for the resolvers.
The `.typedefs.ts` files handle all the types for GraphQL.

### Example directory

```
- TechnologyModel - Model for the Technology entity
- technologies.resolvers.ts - Resolvers for the Technology entity
- technologies.spec.ts - Unit tests for the Technology entity
- technologies.typedefs.ts - Type definitions for the Technology entity
```

### ES6 module models

Using class models is a code smell in serverless infrastructures. By splitting the logic in stand-alone functions that
are exported from their own modules, we can create smaller bundle sizes. Read more on this in
[Dustin Goodman's article on the topic](https://medium.com/@dustinsgoodman/resolving-serverless-webpack-issues-efae729e0619).

## Technologies

### GraphQL

`GraphQL` is a query language for your API and a server-side runtime for executing queries using a type system you define for your data. In this kit, we use GraphQL to query only the data we require from our `Contentful CMS` space.

### Apollo Server v4.x

`Apollo Server` is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client. It's the best way to build a production-ready, self-documenting GraphQL API that can use data from any source. `Apollo Server` is great for a straightforward setup, incremental adoption and universal compatibility and production readiness.

### Serverless v3.x

`Serverless` is an all-in-one development solution for auto-scaling apps on AWS Lambda.
Easily define your applications as AWS Lambda functions and their triggers through simple abstract syntax in the `serverless.yml` file.

`Serverless plugins` extend the Serverless Framework with new features. Plugins in this application include:

- [`serverless-offline`](https://github.com/dherault/serverless-offline) - allows us to deploy our application locally to speed up development cycles.
- [`serverless-plugin-typescript`](https://github.com/graphcool/serverless-plugin-typescript) - allows the use of Typescript with zero-config.
- [`serverless-dotenv-plugin`](https://github.com/infrontlabs/serverless-dotenv-plugin) - preloads function environment variables into Serverless.

### Contentful CMS

Contentful CMS is a composable content management platform that meets the unique demands of digital content and all the teams that produce and work with it. It allows content creators to focus on assembling, editing, approving and publishing content.

### Redis

To reduce API response times and rate limiting, you can cache your data so that the application makes a single request to an API, and all the subsequent data requests will retrieve the data from the cache. We use Redis, an in-memory database that stores data in the server memory, to counter our response problems.

We set up Redis by creating a Redis client with the [`KeyV`](https://github.com/jaredwray/keyv) storage adapter that provides a consistent interface for key-value storage across multiple backends. The adapter is provided to the `cache` option of the `ApolloServer` constructor.

### AWS SQS

`AWS Simple Queue Service` (SQS) is a fully managed message queue service that makes it easy to decouple and scale microservices, distributed systems, and serverless applications.

SQS uses Docker to process queues locally. Start up the container with:

```shell
   yarn infrastructure:up
```

## Deployment

The Serverless Framework needs access to your cloud provider account so that it can create and manage resources on your behalf. You can follow the [guide](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) to get started.

Steps to get started:

1. [Sign up for an AWS account](https://aws.amazon.com/)
2. [Create an IAM User and Access Key](https://www.serverless.com/framework/docs/providers/aws/guide/credentials#create-an-iam-user-and-access-key)
3. Export your `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` credentials.
   ```sh
      export AWS_ACCESS_KEY_ID=<your-key-here>
      export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>
   ```
4. Deploy your application on `AWS Lambda`:
   ```sh
      npm run deploy
   ```
5. To deploy a single function, run:
   ```sh
      npm run deploy function --function myFunction
   ```

To stop your Serverless application, run:

```sh
   serverless remove
```

For more information on Serverless deployment check out this [article](https://www.serverless.com/framework/docs/providers/aws/guide/deploying).
