import { NextFunction, Request, Response, Router } from 'express';
import { addJob } from '../../queue/queue';

const queueRouter = Router();

queueRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
	const job = await addJob(req.body);
	res.json({ jobId: job.id });
	return next();
});

export const QueueRouter = { router: queueRouter };
