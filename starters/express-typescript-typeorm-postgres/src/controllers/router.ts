import { Router } from 'express';
import { HealthController } from './health/health.controller';
import { TechnologyController } from './technology/technology.controller';

const router = Router();

router.use('/health', HealthController.router);
router.use('/technology', TechnologyController.router);

export const apiRouter = router;
