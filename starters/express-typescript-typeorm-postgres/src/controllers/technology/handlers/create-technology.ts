import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { dataSource } from '../../../db/datasource';
import { Technology } from '../../../entities/technology.entity';

export async function createTechnology(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const inserted = await dataSource.getRepository(Technology).insert({
      displayName: req.body.name,
      description: req.body.description,
    });
    res.status(StatusCodes.ACCEPTED).json({ id: inserted.raw.id });
  } catch (e) {
    next(e);
  }
}
