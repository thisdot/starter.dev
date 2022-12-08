import { createTechnology, deleteTechnologyById, updateTechnology } from './mutationHandler.ts';
import { getTechnologies, getTechnology } from './queryHandler.ts';

export const technologyResolvers = {
	Query: {
		getTechnologies,
		getTechnology,
	},
	Mutation: {
		createTechnology,
		updateTechnology,
		deleteTechnologyById,
	},
};
