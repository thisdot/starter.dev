import { Resolvers } from '../../generated/graphql';

export const postResolvers: Resolvers = {
  Query: {
    posts: async (_parent, { greeting }) => {
      return {
        title: `Hello`,
      };
    },
  },
};

