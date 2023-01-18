import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { typeDefs, resolvers } from '../schema';

export const apolloServer = new ApolloServer({ typeDefs, resolvers });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const server = startServerAndCreateLambdaHandler(apolloServer as any);
