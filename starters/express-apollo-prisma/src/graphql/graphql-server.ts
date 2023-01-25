import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { schema } from './schema';
import { ServerContext } from './server-context';
import { serverContextMiddlewareOptions } from './server-context/server-context-middleware-options';

const server = new ApolloServer<ServerContext>({
	schema,
});

export const graphqlServer = server;

export const createGraphqlServerMiddleware = () =>
	expressMiddleware<ServerContext>(server, serverContextMiddlewareOptions);
