import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UpdateResult } from 'typeorm';
import { clearCacheEntry } from '../../../cache/cache';
import { Result } from '../../../constants/result';
import { dataSource } from '../../../db/datasource';
import { Technology } from '../../../entities/technology.entity';
import { ErrorResult, SuccessResult } from '../../../interfaces/results';
import { LogHelper } from '../../../utils/log-helper';

type UpdateTechnologyResult = SuccessResult<{ id: Technology['id'] }> | ErrorResult;

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
    next(updateResult.error);
    return;
  }

  clearCacheEntry(req.baseUrl);
  clearCacheEntry(req.originalUrl);

  res.status(StatusCodes.OK).json(updateResult.data);
}

function updateTechnologyEntry(
  technologyId: number,
  technologyData: Omit<Technology, 'id'>
): Promise<UpdateTechnologyResult> {
  return dataSource
    .getRepository(Technology)
    .update(
      {
        id: technologyId,
      },
      technologyData
    )
    .then<SuccessResult<{ id: Technology['id'] }>>((updateResult: UpdateResult) => ({
      type: Result.SUCCESS,
      data: { id: updateResult.raw.id },
    }))
    .catch((error) => ({
      type: Result.ERROR,
      message: `An unexpected error occurred during updating technology with id ${technologyId}`,
      error,
    }));
}
