import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { dataSource } from '../../../datasource';
import { Technology } from '../../../entities/technology.entity';

export async function getAllTechnology(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const technologies: Technology[] = await dataSource.getRepository(Technology).find();
    res.status(StatusCodes.OK).json(technologies);
  } catch (e) {
    next(e);
  }
}
