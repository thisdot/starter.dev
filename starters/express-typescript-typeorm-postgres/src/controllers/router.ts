import { Router } from 'express';
import { TechnologyController } from './technology/technology.controller';

const router = Router();

router.use('/technology', TechnologyController.router);

export const apiRouter = router;
