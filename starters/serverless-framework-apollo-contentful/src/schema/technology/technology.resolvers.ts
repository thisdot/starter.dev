import { Resolvers, Technology } from '../../generated/graphql';
import { create, getAll, getById } from '../../models/Technology';
import { GraphQLError } from 'graphql/error';

export const technologyResolvers: Resolvers = {
	Query: {
		technology: async (_parent, { id }) => {
			return getById(id) as Promise<Technology>;
		},
		technologies: async (_parent, { limit, offset }) => {
			return getAll(limit, offset) as Promise<Technology[]>;
		},
	},
	Mutation: {
		createTechnology: async (_parent, fields) => {
			return create(fields) as Promise<Technology>;
		},

		updateTechnology: async (_parent, { id, fields }) => {
			const technology = await getById(id);
			if (!fields) return technology;
			if ('displayName' in fields && fields.displayName != null) {
				throw new GraphQLError('Field "displayName" cannot be null');
			}

			await technology.update(fields);
			return technology as Technology;
		},

		deleteTechnology: async (_parent, { id }) => {
			const technology = await getById(id);
			await technology.delete();

			return id;
		},
	},
};
