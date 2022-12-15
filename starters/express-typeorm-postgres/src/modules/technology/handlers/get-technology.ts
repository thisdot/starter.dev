import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { useCache } from '../../../cache/cache';
import { Result } from '../../../constants/result';
import { LogHelper } from '../../../utils/log-helper';
import { findTechnology, TechnologyResult } from '../services/technology.service';

export async function getTechnology(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const technologyId: number = parseInt(req.params.technologyId);
	const technologyResult = await useCache<TechnologyResult>(req.originalUrl, () =>
		findTechnology(technologyId)
	);

	if (technologyResult.type === Result.ERROR) {
		LogHelper.error(technologyResult.message, technologyResult.error);
		return next(technologyResult.error);
	}

	if (technologyResult.type === Result.NOT_FOUND) {
		res.status(StatusCodes.NOT_FOUND).json({
			error: getReasonPhrase(StatusCodes.NOT_FOUND),
			details: technologyResult.message,
		});
		return;
	}
	res.json(technologyResult.data);
}
