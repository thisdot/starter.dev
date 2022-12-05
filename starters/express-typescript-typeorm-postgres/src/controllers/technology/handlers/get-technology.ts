import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Result } from '../../../constants/result';
import { dataSource } from '../../../db/datasource';
import { Technology } from '../../../entities/technology.entity';
import { ErrorResult, SuccessResult } from '../../../interfaces/results';

export async function getTechnology(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const technologyId: number = parseInt(req.params.technologyId);
    const technologyResult = await findTechnology(technologyId);

    if (technologyResult.type === Result.ERROR) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: getReasonPhrase(StatusCodes.NOT_FOUND),
        details: technologyResult.message,
      });
      return;
    }
    res.json(technologyResult.data);
  } catch (e) {
    next(e);
  }
}

function findTechnology(technologyId: number): Promise<SuccessResult<Technology> | ErrorResult> {
  return dataSource
    .getRepository(Technology)
    .findOne({
      where: {
        id: technologyId,
      },
    })
    .then((result) => {
      if (!result) {
        return {
          type: Result.ERROR,
          message: `Could not find technology with id: ${technologyId}`,
        };
      }
      return {
        type: Result.SUCCESS,
        data: result,
      };
    });
}
