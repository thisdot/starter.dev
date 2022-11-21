import express, { Express } from 'express';
import { apiRouter } from './routes/api-routes';

export function bootstrapApp(): Express {
  const app = express();
  app.use(express.json());
  app.use('/api', apiRouter);
  return app;
}
