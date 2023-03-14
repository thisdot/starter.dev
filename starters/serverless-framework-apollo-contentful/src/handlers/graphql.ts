import { ApolloServer, BaseContext } from '@apollo/server';
import { startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import { resolvers, typeDefs } from '../schema';
import { redisClient } from '../utils/redis';
import TechnologyModel from '../models/Technology';

const { REDIS_CACHE_TTL_SECONDS = 900 } = process.env;

export interface MyContext extends BaseContext {
	dataSources: {
		technologies: TechnologyModel[];
	};
}
export const apolloServer = new ApolloServer<MyContext>({
	typeDefs,
	resolvers,
	cache: new KeyvAdapter(redisClient),
	persistedQueries: {
		ttl: Number(REDIS_CACHE_TTL_SECONDS),
	},
	formatError: (formattedError, error) => {
		if (!(error instanceof Error) || typeof error?.message !== 'string') {
			return formattedError;
		}
		try {
			return {
				...formattedError,
				...JSON.parse(error.message),
			};
		} catch {
			return formattedError;
		}
	},
});

export const server = startServerAndCreateLambdaHandler<MyContext>(apolloServer, {
	context: async () => ({ dataSources: { technologies: [] } }),
});
