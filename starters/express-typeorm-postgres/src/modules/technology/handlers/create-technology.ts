import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { clearCacheEntry } from '../../../cache/cache';
import { Result } from '../../../constants/result';
import { LogHelper } from '../../../utils/log-helper';
import { insertTechnology } from '../services/technology.service';

export async function createTechnology(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const inserted = await insertTechnology({
		displayName: req.body.displayName,
		description: req.body.description,
	});

	if (inserted.type === Result.ERROR) {
		LogHelper.error(inserted.message, inserted.error);
		return next(inserted.error);
	}

	clearCacheEntry(req.baseUrl);

	res.status(StatusCodes.ACCEPTED).json(inserted.data);
}
