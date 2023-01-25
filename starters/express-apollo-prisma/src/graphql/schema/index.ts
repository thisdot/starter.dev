import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';

import { helloResolvers, helloTypeDefs } from './hello';
import { technologyResolvers, technologyTypeDefs } from './technology';

const typeDefs = mergeTypeDefs([helloTypeDefs, technologyTypeDefs]);

const resolvers = mergeResolvers([helloResolvers, technologyResolvers]);

export const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });
