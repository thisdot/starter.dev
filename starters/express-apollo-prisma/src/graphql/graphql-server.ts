import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { RequestHandler } from 'express';
import { schema } from './schema';
import { ServerContext } from './server-context';
import { createServerContextMiddlewareOptionsAsync } from './server-context/server-context-middleware-options';

const server = new ApolloServer<ServerContext>({
	schema,
});

export const graphqlServer = server;

export const createGraphqlServerMiddlewareAsync = async (): Promise<RequestHandler> => {
	const options = await createServerContextMiddlewareOptionsAsync();
	return expressMiddleware<ServerContext>(server, options);
};
