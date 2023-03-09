import { ApolloServer, BaseContext } from '@apollo/server';
import { startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import { resolvers, typeDefs } from '../schema';
import { redisClient } from '../utils/redis';

const { REDIS_CACHE_TTL_SECONDS = 900 } = process.env;

export const apolloServer = new ApolloServer<BaseContext>({
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
		return {
			...formattedError,
			...JSON.parse(error.message),
			extensions: undefined,
		};
	},
});

export const server = startServerAndCreateLambdaHandler(apolloServer);
