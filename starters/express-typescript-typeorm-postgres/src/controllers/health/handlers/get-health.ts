import { Request, Response } from 'express';
import { dataSource } from '../../../datasource';
import { ping, PingResult } from '../../../utils/ping';

export async function getHealth(req: Request, res: Response): Promise<void> {
  const { DATABASE_HOST, DATABASE_PORT } = process.env;

  const canReachDatabase = await ping(DATABASE_HOST, DATABASE_PORT);
  if (canReachDatabase !== PingResult.PONG) {
    res.status(503).json({
      isDbInitialised: dataSource.isInitialized,
      canReachDatabase,
    });
    return;
  }

  res.json({
    isDbInitialised: dataSource.isInitialized,
    canReachDatabase,
  });
}
