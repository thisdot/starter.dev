import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { dataSource } from '../../../db/datasource';
import { Technology } from '../../../entities/technology.entity';

export async function updateTechnology(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const technologyId: number = parseInt(req.params.technologyId);
    const updated = await dataSource.getRepository(Technology).update(
      {
        id: technologyId,
      },
      {
        displayName: req.body.name,
        description: req.body.description,
      }
    );
    res.status(StatusCodes.OK).json({ id: updated.raw.id });
  } catch (e) {
    next(e);
  }
}
