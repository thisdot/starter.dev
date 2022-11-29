import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { dataSource } from '../../../datasource';
import { ERROR_TYPE, SUCCESS_TYPE } from '../../../interfaces/constants';
import { ErrorResult, SuccessResult } from '../../../interfaces/results';

export async function getHealth(req: Request, res: Response): Promise<void> {
  const databaseVersion = await pingDatabase();

  if (databaseVersion.type === ERROR_TYPE) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
      error: getReasonPhrase(StatusCodes.SERVICE_UNAVAILABLE),
    });
    return;
  }

  res.json({
    database: databaseVersion.data,
  });
}

async function pingDatabase(): Promise<SuccessResult<{ version: string }> | ErrorResult> {
  return dataSource
    .query(`SELECT version()`)
    .then(
      (databaseVersion) =>
        ({
          type: SUCCESS_TYPE,
          data: databaseVersion,
        } as SuccessResult<{ version: string }>)
    )
    .catch((error) => {
      console.error(error);
      return {
        type: ERROR_TYPE,
        message: error.message,
      };
    });
}
