import { Request, Response } from 'express';
import { dataSource } from '../../../datasource';
import { Technology } from '../../../entities/technology.entity';

export async function updateTechnology(req: Request, res: Response): Promise<void> {
  const technologyId: number = parseInt(req.params.technologyId);
  const updated = await dataSource.getRepository(Technology).update(
    {
      id: technologyId,
    },
    {
      name: req.body.name,
    }
  );
  res.status(200).json({ id: updated.raw.id });
}
