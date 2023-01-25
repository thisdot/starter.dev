import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { schema } from './schema';
import { ServerContext, serverContextMiddlewareOptions } from './server-context';

const server = new ApolloServer<ServerContext>({
	schema,
});

export const graphqlServer = server;

export const createGraphqlServerMiddleware = () =>
	expressMiddleware(server, serverContextMiddlewareOptions);
