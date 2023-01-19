import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';

import { helloResolvers, helloTypeDefs } from './hello';

const typeDefs = mergeTypeDefs([helloTypeDefs]);

const resolvers = mergeResolvers([helloResolvers]);

export const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });
