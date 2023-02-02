import { ApolloServer, BaseContext } from '@apollo/server';
import { startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import { typeDefs, resolvers } from '../schema';
import { redisClient } from '../utils/redis';

const { REDIS_CACHE_TTL_SECONDS = 900 } = process.env;

export const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	cache: new KeyvAdapter(redisClient),
	persistedQueries: {
		ttl: Number(REDIS_CACHE_TTL_SECONDS),
	},
}) as unknown as ApolloServer<BaseContext>;

export const server = startServerAndCreateLambdaHandler(apolloServer);
