import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { dataSource } from '../../../db/datasource';
import { Result } from '../../../constants/result';
import { ErrorResult, SuccessResult } from '../../../interfaces/results';
import { LogHelper } from '../../../utils/log-helper';

export async function getHealth(req: Request, res: Response): Promise<void> {
  const databaseVersion = await checkConnection();

  if (databaseVersion.type === Result.ERROR) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
      error: getReasonPhrase(StatusCodes.SERVICE_UNAVAILABLE),
      details: databaseVersion.message,
    });
    return;
  }

  res.json({
    database: databaseVersion.data,
  });
}

function checkConnection(): Promise<SuccessResult<{ version: string }> | ErrorResult> {
  return dataSource
    .query(`SELECT version()`)
    .then<SuccessResult<{ version: string }>>((databaseVersion) => ({
      type: Result.SUCCESS,
      data: databaseVersion[0],
    }))
    .catch((error) => {
      LogHelper.error(error);
      return {
        type: Result.ERROR,
        message: error.message,
        error,
      };
    });
}
