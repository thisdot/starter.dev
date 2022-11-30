import { NextFunction, Request, Response } from 'express';
import { dataSource } from '../../../datasource';
import { Technology } from '../../../entities/technology.entity';

export async function getTechnology(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const technologyId: number = parseInt(req.params.technologyId);
    const technology: Technology = await dataSource.getRepository(Technology).findOne({
      where: {
        id: technologyId,
      },
    });
    res.json(technology);
  } catch (e) {
    next(e);
  }
}
