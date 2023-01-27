import { ApolloServer, BaseContext } from '@apollo/server';
import { startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import { typeDefs, resolvers } from '../schema';
import { redisClient } from '../utils/redis';

export const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	cache: new KeyvAdapter(redisClient),
}) as unknown as ApolloServer<BaseContext>;

export const server = startServerAndCreateLambdaHandler(apolloServer);
