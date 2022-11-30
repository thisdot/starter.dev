import { NextFunction, Request, Response } from 'express';
import { dataSource } from '../../../datasource';
import { Technology } from '../../../entities/technology.entity';

export async function getAllTechnology(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const technologies: Technology[] = await dataSource.getRepository(Technology).find();
    res.json(technologies);
  } catch (e) {
    next(e);
  }
}
