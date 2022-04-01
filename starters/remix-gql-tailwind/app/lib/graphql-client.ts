import { GraphQLClient } from 'graphql-request';

let gqlClient: GraphQLClient;

const endpoint = process.env.GITHUB_GRAPHQL_ENDPOINT ?? 'https://api.starter.dev/graphql';
  
gqlClient = new GraphQLClient(endpoint);

export default gqlClient;