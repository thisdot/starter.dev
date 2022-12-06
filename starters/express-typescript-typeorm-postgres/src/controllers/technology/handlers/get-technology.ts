import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { useCache } from '../../../cache/cache';
import { Result } from '../../../constants/result';
import { dataSource } from '../../../db/datasource';
import { Technology } from '../../../entities/technology.entity';
import { ErrorResult, NotFoundResult, SuccessResult } from '../../../interfaces/results';
import { LogHelper } from '../../../utils/log-helper';

type TechnologyResult = SuccessResult<Technology> | NotFoundResult | ErrorResult;

export async function getTechnology(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const technologyId: number = parseInt(req.params.technologyId);
  const technologyResult = await useCache(req.originalUrl, () => findTechnology(technologyId));

  if (technologyResult.type === Result.ERROR) {
    LogHelper.error(technologyResult.message, technologyResult.error);
    next(technologyResult.error);
    return;
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

function findTechnology(technologyId: number): Promise<TechnologyResult> {
  return dataSource
    .getRepository(Technology)
    .findOne({
      where: {
        id: technologyId,
      },
    })
    .then<SuccessResult<Technology> | NotFoundResult>((result) => {
      if (!result) {
        return {
          type: Result.NOT_FOUND,
          message: `Could not find technology with id: ${technologyId}`,
        };
      }
      return {
        type: Result.SUCCESS,
        data: result,
      };
    })
    .catch((error) => {
      return {
        type: Result.ERROR,
        message: `Unexpected error while fetching technology with id ${technologyId}`,
        error,
      };
    });
}
