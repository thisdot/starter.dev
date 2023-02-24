import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { generateJob } from './job-generator';

export type JobGeneratorHandlerRequestBody =
	| {
			message?: string;
	  }
	| undefined;

export const DEFAULT_JOB_MESSAGE = 'Job sample message';

export const jobGeneratorHandler: RequestHandler<
	ParamsDictionary,
	never,
	JobGeneratorHandlerRequestBody
> = async (req, res) => {
	const jobMessage = req.body?.message || DEFAULT_JOB_MESSAGE;
	const success = await generateJob(jobMessage);
	if (success) {
		res.sendStatus(204);
	} else {
		res.sendStatus(506);
	}
};
