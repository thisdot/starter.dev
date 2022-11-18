import gql from 'graphql-tag';

export const postTypeDefs = gql`
  type Query {
    "Simple hello world query that accepts a greeting"
    posts(greeting: String!): {
        title: String!
    }
  }
`;

