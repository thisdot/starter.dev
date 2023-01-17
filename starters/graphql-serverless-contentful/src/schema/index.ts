import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { helloTypeDefs, helloResolvers } from './hello';
import { postTypeDefs, postResolvers } from './post';
import { commentTypeDefs, commentResolvers } from './comment';

export const typeDefs = mergeTypeDefs([
  helloTypeDefs,
  postTypeDefs,
  commentTypeDefs,
]);

export const resolvers = mergeResolvers([
  helloResolvers,
  postResolvers,
  commentResolvers,
]);
