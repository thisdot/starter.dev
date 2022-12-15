import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { clearCacheEntry } from '../../../cache/cache';
import { Result } from '../../../constants/result';
import { LogHelper } from '../../../utils/log-helper';
import { updateTechnologyEntry } from '../services/technology.service';

export async function updateTechnology(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const technologyId: number = parseInt(req.params.technologyId);
	const updateResult = await updateTechnologyEntry(technologyId, {
		displayName: req.body.name,
		description: req.body.description,
	});

	if (updateResult.type === Result.ERROR) {
		LogHelper.error(updateResult.message, updateResult.error);
		return next(updateResult.error);
	}

	clearCacheEntry(req.baseUrl);
	clearCacheEntry(req.originalUrl);

	res.status(StatusCodes.OK).json(updateResult.data);
}
