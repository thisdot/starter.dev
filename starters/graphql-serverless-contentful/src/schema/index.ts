import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { helloTypeDefs, helloResolvers } from './hello';
import { postTypeDefs, postResolvers } from './post';

export const typeDefs = mergeTypeDefs([helloTypeDefs, postTypeDefs]);

export const resolvers = mergeResolvers([helloResolvers, postResolvers]);

