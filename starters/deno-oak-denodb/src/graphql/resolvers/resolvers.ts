import { createTechnology, deleteTechnologyById, updateTechnology } from './mutation_handler.ts';
import { getTechnologies, getTechnology } from './query_handler.ts';

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
