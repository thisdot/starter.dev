import { MutationResolvers, QueryResolvers, Resolvers } from "../interfaces/codegen.ts";
import { GraphqlContext } from "../interfaces/graphql_interfaces.ts";
import { createTechnology, deleteTechnologyById, updateTechnology } from './mutation_handler.ts';
import { getTechnologies, getTechnology } from './query_handler.ts';

export const technologyResolvers: Resolvers<GraphqlContext> = {
	Query: {
		getTechnologies,
		getTechnology,
	} as QueryResolvers<GraphqlContext>,
	Mutation: {
		createTechnology,
		updateTechnology,
		deleteTechnologyById,
	} as MutationResolvers<GraphqlContext>,
};
