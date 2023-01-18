import { Resolvers } from '../../generated/graphql';
import { PostModel } from '../../models/PostModel';

export const postResolvers: Resolvers = {
  Query: {
    posts: async (_parent, { id }) => {
      if (id) {
        const post = await PostModel.get(id);
        return [
          {
            id: post.sys.id,
            content: post.fields.content['en-US'],
          },
        ];
      }

      const allPosts = await PostModel.getAll();

      return allPosts.map((post) => ({
        id: post.sys.id,
        content: post.fields.content['en-US'],
      }));
    },
  },
  Mutation: {
    createPost: async (_parent, { content }) => {
      const post = await PostModel.create(content);

      return {
        id: post.sys.id,
        content: post.fields.content['en-US'],
      };
    },

    updatePost: async (_parent, { id, content }) => {
      const post = await PostModel.update(id, content);

      return {
        id: post.sys.id,
        content: post.fields.content['en-US'],
      };
    },
  },
};
