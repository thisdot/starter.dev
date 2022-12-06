import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { clearCacheEntry } from '../../../cache/cache';
import { Result } from '../../../constants/result';
import { dataSource } from '../../../db/datasource';
import { Technology } from '../../../entities/technology.entity';
import { ErrorResult, SuccessResult } from '../../../interfaces/results';
import { LogHelper } from '../../../utils/log-helper';

type DeleteTechnologyResult = SuccessResult<null> | ErrorResult;

export async function deleteTechnology(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const technologyId: number = parseInt(req.params.technologyId);
  const deleteResult = await deleteTechnologyEntry(technologyId);

  if (deleteResult.type === Result.ERROR) {
    LogHelper.error(deleteResult.message, deleteResult.error);
    next(deleteResult.error);
    return;
  }

  clearCacheEntry(req.baseUrl);
  clearCacheEntry(req.originalUrl);

  res.status(StatusCodes.OK).json({
    id: technologyId,
  });
}

function deleteTechnologyEntry(technologyId: number): Promise<DeleteTechnologyResult> {
  return dataSource
    .getRepository(Technology)
    .delete({
      id: technologyId,
    })
    .then<SuccessResult<null>>(() => ({
      type: Result.SUCCESS,
      data: null,
    }))
    .catch((error) => ({
      type: Result.ERROR,
      message: `An unexpected error occurred while deleting technology with id ${technologyId}`,
      error: error,
    }));
}
