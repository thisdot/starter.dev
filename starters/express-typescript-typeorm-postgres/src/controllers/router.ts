import { NextFunction, Request, Response, Router } from 'express';
import { TechnologyController } from './technology/technology.controller';

const router = Router();

router.use('/technology', TechnologyController.router);

// TODO: #537 delete this when implementing the health check controller
router.get('/hello', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello!');
});

export const apiRouter = router;
