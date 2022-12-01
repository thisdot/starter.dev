import express, { Express, Request, Response } from 'express';
import expressOasGenerator, { SPEC_OUTPUT_FILE_BEHAVIOR } from 'express-oas-generator';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { apiRouter } from './controllers/router';
import { corsMiddleware } from './middlewares/cors';

export function bootstrapApp(): Express {
  const app = express();
  expressOasGenerator.handleResponses(app, {
    specOutputFileBehavior: SPEC_OUTPUT_FILE_BEHAVIOR.RECREATE,
    swaggerDocumentOptions: {},
  });
  app.use(express.json());

  app.options('*', corsMiddleware);
  app.use(corsMiddleware);

  app.use('/api', apiRouter);
  expressOasGenerator.handleRequests();
  app.use(genericErrorHandler);
  return app;
}

function genericErrorHandler(err, req: Request, res: Response) {
  console.error('genericerrorhandler', err);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
}
