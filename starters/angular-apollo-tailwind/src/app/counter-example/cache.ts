import { InMemoryCache, makeVar } from '@apollo/client/cache';

export const counterVar = makeVar(0);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        counter: {
          read() {
            return counterVar();
          },
        },
      },
    },
  },
});
