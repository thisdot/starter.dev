import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { useCache } from '../../../cache/cache';
import { Result } from '../../../constants/result';
import { LogHelper } from '../../../utils/log-helper';
import { getTechnologies, TechnologiesResult } from '../services/technology.service';

export async function getAllTechnologies(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const technologiesResult = await useCache<TechnologiesResult>(req.baseUrl, getTechnologies);

	if (technologiesResult.type === Result.ERROR) {
		LogHelper.error(
			'An unexpected error occurred',
			technologiesResult.message,
			technologiesResult.error
		);
		return next(technologiesResult.error);
	}
	res.status(StatusCodes.OK).json(technologiesResult.data);
}
