# Serverless Framework, SQS, DynamoDB Kit

## Available Commands

- `build` bundles the project using the serverless packaging serverless. The produced artifacts will ship bundles shipped to AWS on deployment. You can optionally pass `--analyze <function name>` to run the bundle analzyer and visualize the results to understand your handler bundles.
- `start` runs the `serverless-offline` provided server for local development and testing. Be sure to have the local docker infrastructure running to emulate the related services.
- `test`
- `lint` runs `eslint` under the hood. You can use all the eslint available command line arguments. To lint the entire project, run `yarn lint .`, or equivalent. You can affix `--fix` to auto-correct linting issues that eslint can handle.
- `format:check` runs prettier format checking on all project files.
- `format:write` runs prettier format writing on all project files.
- `infrastructure:up` creates docker container and related images and runs them in the background. This should only be needed once during initial setup.
- `infrastructure:down` deletes the docker container and related images.
- `infrastructure:start` starts the docker container.
- `infrastructure:stop` stops the docker container.

## DynamoDB

View Local Admin Tool at http://localhost:8001/
