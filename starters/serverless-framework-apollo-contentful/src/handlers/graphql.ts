import { ApolloServer, BaseContext } from '@apollo/server';
import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import { resolvers, typeDefs } from '../schema';
import { redisClient } from '../utils/redis';
import { Technology } from '../generated/graphql';

const { REDIS_CACHE_TTL_SECONDS = 900 } = process.env;

export interface MyContext extends BaseContext {
	dataSources: {
		technologies: Technology[];
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
		return {
			...formattedError,
			...JSON.parse(error.message),
			extensions: undefined,
		};
	},
});

const createRequestHandler = handlers.createAPIGatewayProxyEventV2RequestHandler;
export const server = startServerAndCreateLambdaHandler<
	ReturnType<typeof createRequestHandler>,
	MyContext
>(apolloServer, createRequestHandler(), {
	context: async () => ({ dataSources: { technologies: [] } }),
});
