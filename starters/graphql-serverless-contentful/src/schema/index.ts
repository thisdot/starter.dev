import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { helloTypeDefs, helloResolvers } from './hello';

export const typeDefs = mergeTypeDefs([helloTypeDefs]);

export const resolvers = mergeResolvers([helloResolvers]);

