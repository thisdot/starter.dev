import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { useCache } from '../../../cache/cache';
import { Result } from '../../../constants/result';
import { dataSource } from '../../../db/datasource';
import { Technology } from '../../../entities/technology.entity';
import { ErrorResult, SuccessResult } from '../../../interfaces/results';
import { LogHelper } from '../../../utils/log-helper';

type TechnologiesResult = SuccessResult<Technology[]> | ErrorResult;

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
    next(technologiesResult.error);
    return;
  }
  res.status(StatusCodes.OK).json(technologiesResult.data);
}

function getTechnologies(): Promise<SuccessResult<Technology[]> | ErrorResult> {
  return dataSource
    .getRepository(Technology)
    .find()
    .then<SuccessResult<Technology[]>>((technologies: Technology[]) => ({
      type: Result.SUCCESS,
      data: technologies,
    }))
    .catch((error) => ({
      type: Result.ERROR,
      message: error.message,
      error,
    }));
}
