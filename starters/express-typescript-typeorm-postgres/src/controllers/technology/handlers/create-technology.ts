import { Request, Response } from 'express';
import { dataSource } from '../../../datasource';
import { Technology } from '../../../entities/technology.entity';

export async function createTechnology(req: Request, res: Response): Promise<void> {
  const inserted = await dataSource.getRepository(Technology).insert({
    name: req.body.name,
  });
  res.status(202).json({ id: inserted.raw.id });
}
