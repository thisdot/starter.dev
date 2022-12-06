import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { InsertResult } from 'typeorm';
import { clearCacheEntry } from '../../../cache/cache';
import { Result } from '../../../constants/result';
import { dataSource } from '../../../db/datasource';
import { Technology } from '../../../entities/technology.entity';
import { ErrorResult, SuccessResult } from '../../../interfaces/results';
import { LogHelper } from '../../../utils/log-helper';

type CreateTechnologyResult = SuccessResult<{ id: Technology['id'] }> | ErrorResult;

export async function createTechnology(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const inserted: CreateTechnologyResult = await insertTechnology({
    displayName: req.body.name,
    description: req.body.description,
  });

  if (inserted.type === Result.ERROR) {
    LogHelper.error(inserted.message, inserted.error);
    next(inserted.error);
    return;
  }

  clearCacheEntry(req.baseUrl);

  res.status(StatusCodes.ACCEPTED).json(inserted.data);
}

function insertTechnology(technology: Omit<Technology, 'id'>): Promise<CreateTechnologyResult> {
  return dataSource
    .getRepository(Technology)
    .insert(technology)
    .then<SuccessResult<{ id: Technology['id'] }>>((insertedTechnology: InsertResult) => ({
      type: Result.SUCCESS,
      data: { id: insertedTechnology.raw.id },
    }))
    .catch((error) => ({
      type: Result.ERROR,
      message: `An unexpected error occurred during creating technology`,
      error,
    }));
}
