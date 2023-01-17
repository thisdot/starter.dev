import { ApolloServer, ApolloServerOptions, BaseContext } from '@apollo/server';
import { startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { typeDefs, resolvers } from '../schema';

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
} as ApolloServerOptions<BaseContext>);

export const server = startServerAndCreateLambdaHandler(apolloServer);
