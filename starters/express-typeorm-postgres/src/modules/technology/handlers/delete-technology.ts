import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { clearCacheEntry } from '../../../cache/cache';
import { Result } from '../../../constants/result';
import { LogHelper } from '../../../utils/log-helper';
import { deleteTechnologyEntry } from '../services/technology.service';

export async function deleteTechnology(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const technologyId: number = parseInt(req.params.technologyId);
	const deleteResult = await deleteTechnologyEntry(technologyId);

	if (deleteResult.type === Result.ERROR) {
		LogHelper.error(deleteResult.message, deleteResult.error);
		return next(deleteResult.error);
	}

	clearCacheEntry(req.baseUrl);
	clearCacheEntry(req.originalUrl);

	res.status(StatusCodes.OK).json({
		id: technologyId,
	});
}
