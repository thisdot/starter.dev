import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { dataSource } from '../../../datasource';
import { Result } from '../../../constants/result';
import { ErrorResult, SuccessResult } from '../../../interfaces/results';

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
    .then(
      (databaseVersion) =>
        ({
          type: Result.SUCCESS,
          data: databaseVersion,
        } as SuccessResult<{ version: string }>)
    )
    .catch((error) => {
      console.error(error);
      return {
        type: Result.ERROR,
        message: error.message,
      };
    });
}
