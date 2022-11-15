export const helloResolvers = {
  Query: {
    hello: async (_parent, { greeting }) => {
      return `Hello, ${greeting}`;
    },
  },
};

