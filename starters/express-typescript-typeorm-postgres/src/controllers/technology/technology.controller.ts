import { Router } from 'express';
import { createTechnology } from './handlers/create-technology';
import { deleteTechnology } from './handlers/delete-technology';
import { getAllTechnology } from './handlers/get-all-technology';
import { getTechnology } from './handlers/get-technology';
import { updateTechnology } from './handlers/update-technology';

const technologyRouter = Router();

technologyRouter.get('/', getAllTechnology);
technologyRouter.get('/:technologyId', getTechnology);

technologyRouter.post('/', createTechnology);
technologyRouter.put('/:technologyId', updateTechnology);

technologyRouter.delete('/:technologyId', deleteTechnology);

export const TechnologyController = { router: technologyRouter };
