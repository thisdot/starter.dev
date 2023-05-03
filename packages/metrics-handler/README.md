# Metrics tracking - serverless handler

In order to safely track generated events, we need a handler function that has access to the required secrets. This serverless function does that.

## Local development

1. Install the packages

   `yarn install`

2. Set up your .env file

   `cp .env.example .env`
   For valid environment variables, please reach out to the project coordinator.

3. You can start up the handler function locally by running

   `npm run dev`
