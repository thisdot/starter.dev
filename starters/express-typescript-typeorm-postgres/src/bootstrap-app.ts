import express, { Express } from 'express';
import expressOasGenerator, { SPEC_OUTPUT_FILE_BEHAVIOR } from 'express-oas-generator';
import { apiRouter } from './controllers/router';

export function bootstrapApp(): Express {
  const app = express();
  expressOasGenerator.handleResponses(app, {
    specOutputFileBehavior: SPEC_OUTPUT_FILE_BEHAVIOR.RECREATE,
    swaggerDocumentOptions: {},
  });
  app.use(express.json());
  app.use('/api', apiRouter);
  expressOasGenerator.handleRequests();
  return app;
}
