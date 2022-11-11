import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: 'signal-api',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: ['serverless-esbuild', 'serverless-offline'],
  custom: {
    'serverless-offline': {
      httpPort: 4000,
      lambdaPort: 4002,
    },
    esbuild: {
      packager: 'yarn',
      bundle: true,
      minify: true,
      sourcemap: true,
    },
  },
  package: {
    individually: true,
    patterns: ['handler.js', '!node_modules/**'],
    excludeDevDependencies: true,
  },
  provider: {
    name: 'aws',
    profile: 'thisdot',
    runtime: 'nodejs16.x',
    stage: "${opt:stage, 'dev'}",
    region: "${opt:region, 'us-east-1'}",
    memorySize: 512, // default: 1024MB
    timeout: 29, // default: max allowable for Gateway
    httpApi: {
      // TODO: update to be more restrictive for real apps: https://www.serverless.com/framework/docs/providers/aws/events/http-api/#cors-setup
      cors: true,
    },
    environment: {
      REGION: '${aws:region}',
      SLS_STAGE: '${sls:stage}',
      //   JWT_SECRET: '${env:JWT_SECRET}',
      //   SEGMENT_WRITE_KEY: '${env:SEGMENT_WRITE_KEY}',
    },
    tracing: {
      apiGateway: true,
      lambda: true,
    },
  },
  functions: {
    graphql: {
      handler: 'src/handlers/graphql.server',
      events: [
        {
          httpApi: {
            method: 'post',
            path: '/graphql',
          },
        },
        {
          httpApi: {
            method: 'get',
            path: '/graphql',
          },
        },
      ],
    },
    // healthcheck: {
    //   handler: 'src/handlers/healthcheck.handler',
    //   events: [
    //     {
    //       httpApi: {
    //         path: '/healthcheck',
    //         method: 'get',
    //       },
    //     },
    //   ],
    // },
  },
};

module.exports = serverlessConfiguration;
