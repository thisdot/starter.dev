import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';

import { technologyResolvers, technologyTypeDefs } from './technology';

const typeDefs = mergeTypeDefs([technologyTypeDefs]);

const resolvers = mergeResolvers([technologyResolvers]);

export const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });
