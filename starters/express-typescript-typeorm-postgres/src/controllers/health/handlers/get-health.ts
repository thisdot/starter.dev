import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { redisHealthCheck } from '../../../cache/redis-cache-client';
import { Result } from '../../../constants/result';
import { dataSource } from '../../../db/datasource';
import { ErrorResult, SuccessResult } from '../../../interfaces/results';
import { defaultQueue } from '../../../queue/queue';
import { LogHelper } from '../../../utils/log-helper';

export async function getHealth(req: Request, res: Response): Promise<void> {
  const [databaseVersion, redisPingResult, jobCount] = await Promise.all([
    checkDatabaseConnection(),
    checkRedisCacheConnection(),
    defaultQueue.count(),
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
     *  We return 200 here, because if the cache server is down the application still works
     *  If you need to, set up alerting based on the contents of this response or notify your
     *  alerting system programmatically.
     *
     *  You can also change the status code if you'd prefer this to be an error.
     */
    res.status(StatusCodes.OK).json({
      database: databaseVersion.data,
      redisConnection: 'CONNECTION ERROR',
      error: redisPingResult.error,
    });
    return;
  }

  res.json({
    database: databaseVersion.data,
    redisConnection: redisPingResult.data,
    jobCount,
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
