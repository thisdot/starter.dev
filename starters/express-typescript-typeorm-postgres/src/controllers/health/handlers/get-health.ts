import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { dataSource } from '../../../datasource';
import { ping, PingResult } from '../../../utils/ping';

export async function getHealth(req: Request, res: Response): Promise<void> {
  const { DATABASE_HOST, DATABASE_PORT } = process.env;

  const canReachDatabase = await ping(DATABASE_HOST, DATABASE_PORT);
  if (canReachDatabase !== PingResult.PONG) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
      isDbInitialised: dataSource.isInitialized,
      canReachDatabase,
      error: getReasonPhrase(StatusCodes.SERVICE_UNAVAILABLE),
    });
    return;
  }

  res.json({
    isDbInitialised: dataSource.isInitialized,
    canReachDatabase,
  });
}
