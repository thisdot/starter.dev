import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import {
  provideApolloClient,
  DefaultApolloClient,
} from '@vue/apollo-composable';
import { setContext } from '@apollo/client/link/context';
import { provide } from 'vue';

import fetch from 'cross-fetch';
// const GITHUB_ENCODED_TOKEN =
//   'YmVmZWZmM2Q3YjZlZWEwYjgxODQ2ZjMzNjdjMGExYzdhNGY0NWIzOQ==';

// const GITHUB_DECODED_TOKEN = atob(GITHUB_ENCODED_TOKEN);

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
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export const setupGraphQL = (): void => {
  provideApolloClient(apolloClient);
  // provide(DefaultApolloClient, apolloClient);
};
