import gql from 'graphql-tag';

export const helloTypeDefs = gql`
  type Query {
    "Simple hello world query that accepts a greeting"
    hello(greeting: String!): String!
  }
`;

