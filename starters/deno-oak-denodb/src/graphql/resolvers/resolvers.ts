import { Resolvers } from '../interfaces/codegen.ts';
import { GraphqlContext } from '../interfaces/graphql_interfaces.ts';
import { createTechnology, deleteTechnologyById, updateTechnology } from './mutation_handler.ts';
import { getTechnologies, getTechnology } from './query_handler.ts';

export const technologyResolvers: Resolvers<GraphqlContext> = {
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
