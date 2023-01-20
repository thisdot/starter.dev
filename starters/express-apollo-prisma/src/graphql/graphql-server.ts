import { ApolloServer } from '@apollo/server';
import { schema } from './schema';
import { ServerContext } from './server-context';

const server = new ApolloServer<ServerContext>({
	schema,
});

export const graphqlServer = server;
