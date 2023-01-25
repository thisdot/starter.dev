import { ServerContext } from '../../server-context';
import { Resolvers } from '../generated/types';

export const helloResolvers: Resolvers<ServerContext> = {
	Query: {
		hello: async (_parent, { greeting }) => {
			return `Hello, ${greeting}`;
		},
	},
};
