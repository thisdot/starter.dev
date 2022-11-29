import express, { Express } from 'express';
import { apiRouter } from './controllers/router';

export function bootstrapApp(): Express {
  const app = express();
  app.use(express.json());
  app.use('/api', apiRouter);
  return app;
}
