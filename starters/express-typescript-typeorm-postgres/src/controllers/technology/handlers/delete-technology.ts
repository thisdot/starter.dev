import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { dataSource } from '../../../db/datasource';
import { Technology } from '../../../entities/technology.entity';

export async function deleteTechnology(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const technologyId: number = parseInt(req.params.technologyId);
    await dataSource.getRepository(Technology).delete({
      id: technologyId,
    });
    res.status(StatusCodes.OK).json({
      id: technologyId,
    });
  } catch (e) {
    next(e);
  }
}
