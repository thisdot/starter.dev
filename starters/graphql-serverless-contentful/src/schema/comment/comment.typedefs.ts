import gql from 'graphql-tag';

export const commentTypeDefs = gql`
  type Comment {
    id: ID!
    content: String!
  }

  type Query {
    "Simple hello world query that accepts a greeting"
    comments(id: ID): [Comment]
  }

  type Mutation {
    "Simple hello world mutation that accepts a greeting"
    createComment(content: String!): Comment
    updateComment(id: ID!, content: String!): Comment
    deleteComment(id: ID!): ID
  }
`;

