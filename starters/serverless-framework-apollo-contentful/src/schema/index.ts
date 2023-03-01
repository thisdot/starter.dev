import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { technologyResolvers, technologyTypeDefs } from './technology';

export const typeDefs = mergeTypeDefs([technologyTypeDefs]);

export const resolvers = mergeResolvers([technologyResolvers]);
