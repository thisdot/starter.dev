import { ApolloServer, BaseContext } from '@apollo/server';
import { startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import Keyv from 'keyv';
import { typeDefs, resolvers } from '../schema';

const {
	REDIS_PORT = 6379,
	REDIS_HOST = '127.0.0.1',
	REDIS_USER = 'default',
	REDIS_PASS = '',
} = process.env;
const client = new Keyv(
	`redis://${REDIS_USER}:${REDIS_PASS}@${REDIS_HOST}:${REDIS_PORT}`
);

export const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	cache: new KeyvAdapter(client),
}) as unknown as ApolloServer<BaseContext>;

export const server = startServerAndCreateLambdaHandler(apolloServer);
