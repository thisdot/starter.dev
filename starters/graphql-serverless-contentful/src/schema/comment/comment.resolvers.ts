import { Resolvers } from '../../generated/graphql';
import { CommentModel } from '../../models/CommentModel';

export const commentResolvers: Resolvers = {
  Query: {
    comments: async (_parent, { id }) => {
      if (id) {
        const comment = await CommentModel.get(id);
        return [
          {
            id: comment.sys.id,
            content: comment.fields.content['en-US'],
          },
        ];
      }

      const allComments = await CommentModel.getAll();

      return allComments.map((comment) => ({
        id: comment.sys.id,
        content: comment.fields.content['en-US'],
      }));
    },
  },
  Mutation: {
    createComment: async (_parent, { content }) => {
      const comment = await CommentModel.create(content);

      return {
        id: comment.sys.id,
        content: comment.fields.content['en-US'],
      };
    },

    updateComment: async (_parent, { id, content }) => {
      const comment = await CommentModel.update(id, content);

      return {
        id: comment.sys.id,
        content: comment.fields.content['en-US'],
      };
    },
  },
};
