import { Router } from 'express';
import { getHealth } from './handlers/get-health';

const healthRouter = Router();

healthRouter.get('/', getHealth);

export const HealthController = { router: healthRouter };
