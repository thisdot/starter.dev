import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import {
  provideApolloClient,
} from '@vue/apollo-composable';
import { setContext } from '@apollo/client/link/context';

import fetch from 'cross-fetch';

import { counter } from '../globals/counter';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GRAPHQL_URL,
  fetch,
});

const authLink = setContext((_, { headers }) => {
  const authToken = '';

  return authToken
    ? { headers: { ...headers, authorization: `token ${authToken}` } }
    : { headers };
});

// Cache implementation
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        count: {
          read() {
            return counter();
          },
        },
      },
    },
  },
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export const setupGraphQL = (): void => {
  provideApolloClient(apolloClient);
};
