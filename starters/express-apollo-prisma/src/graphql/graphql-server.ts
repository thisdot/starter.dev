import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { RedisClient } from '../redis';
import { schema } from './schema';
import { ServerContext } from './server-context';
import { createServerContextMiddlewareOptions } from './server-context/server-context-middleware-options';

const server = new ApolloServer<ServerContext>({
	schema,
});

export const graphqlServer = server;

export const createGraphqlServerMiddleware = (
	redisClient?: RedisClient,
	redisCacheTtlSeconds?: number
) =>
	expressMiddleware<ServerContext>(
		server,
		createServerContextMiddlewareOptions(redisClient, redisCacheTtlSeconds)
	);
