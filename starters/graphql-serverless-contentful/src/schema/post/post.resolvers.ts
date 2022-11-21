import axios from 'axios';
import { Resolvers } from '../../generated/graphql';

export const postResolvers: Resolvers = {
  Query: {
    posts: async (_parent, { id }) => {
      if (id) {
        const { data } = await axios.get(`?sys.id=${id}`);
        return data.items.map((item: any) => ({
          id: item.sys.id,
          content: item.fields.content['en-US'],
        }));
      }
      const response = await axios.get('/', {
        params: {
          'sys.contentType.sys.id': 'post',
        },
      });

      return response.data.items.map((item: any) => ({
        id: item.sys.id,
        content: item.fields.content['en-US'],
      }));
    },
  },
  Mutation: {
    createPost: async (_parent, { content }) => {
      const response = await axios.put('/', {
        fields: {
          content: {
            'en-US': content,
          },
        },
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'post',
          },
        },
      });

      return {
        id: response.data.sys.id,
        content: response.data.fields.content['en-US'],
      };
    },
  },
};

