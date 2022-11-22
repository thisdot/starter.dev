import { Request, Response } from 'express';
import { dataSource } from '../../../datasource';
import { Technology } from '../../../entities/technology.entity';

export async function getAllTechnology(req: Request, res: Response): Promise<void> {
  const technologies: Technology[] = await dataSource.getRepository(Technology).find();
  res.json(technologies);
}
