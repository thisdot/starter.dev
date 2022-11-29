import { Request, Response } from 'express';
import { dataSource } from '../../../datasource';
import { Technology } from '../../../entities/technology.entity';

export async function deleteTechnology(req: Request, res: Response): Promise<void> {
  const technologyId: number = parseInt(req.params.technologyId);
  await dataSource.getRepository(Technology).delete({
    id: technologyId,
  });
  res.status(200).json({
    id: technologyId,
  });
}
