import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { cacheRedisClient, redisHealthCheck } from '../../../cache/cache';
import { Result } from '../../../constants/result';
import { dataSource } from '../../../db/datasource';
import { ErrorResult, SuccessResult } from '../../../interfaces/results';
import { LogHelper } from '../../../utils/log-helper';

export async function getHealth(req: Request, res: Response): Promise<void> {
  const [databaseVersion, redisPingResult] = await Promise.all([
    checkDatabaseConnection(),
    checkRedisCacheConnection(),
  ]);

  if (databaseVersion.type === Result.ERROR) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
      error: getReasonPhrase(StatusCodes.SERVICE_UNAVAILABLE),
      details: databaseVersion.message,
    });
    return;
  }

  if (redisPingResult.type === Result.ERROR) {
    /**
     *  We return 206 here, because if the cache server is down the application is still working,
     *  but we can set up alerts on this status code
     */
    res.status(StatusCodes.PARTIAL_CONTENT).json({
      database: databaseVersion.data,
      redisConnection: 'CONNECTION ERROR',
      error: redisPingResult.error,
    });
    return;
  }

  res.json({
    database: databaseVersion.data,
    redisConnection: redisPingResult.data,
  });
}

function checkDatabaseConnection(): Promise<SuccessResult<{ version: string }> | ErrorResult> {
  return dataSource
    .query(`SELECT version()`)
    .then<SuccessResult<{ version: string }>>((databaseVersion) => ({
      type: Result.SUCCESS,
      data: databaseVersion[0].version,
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

function checkRedisCacheConnection(): Promise<SuccessResult<'CONNECTED'> | ErrorResult> {
  return redisHealthCheck()
    .then<SuccessResult<'CONNECTED'>>((answer: 'CONNECTED') => ({
      type: Result.SUCCESS,
      data: answer,
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
