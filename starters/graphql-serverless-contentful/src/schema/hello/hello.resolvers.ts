import { Resolvers } from '../../generated/graphql';

export const helloResolvers: Resolvers = {
	Query: {
		hello: async (_parent, { greeting }) => {
			return `Hello, ${greeting}`;
		},
	},
};
