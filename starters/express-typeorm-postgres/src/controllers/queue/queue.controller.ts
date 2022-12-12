import { Request, Response, Router } from 'express';
import { addJob } from '../../queue/queue';

const queueRouter = Router();

queueRouter.post('/', async (req: Request, res: Response) => {
	const job = await addJob(req.body);
	res.json({ jobId: job.id });
});

export const QueueRouter = { router: queueRouter };
