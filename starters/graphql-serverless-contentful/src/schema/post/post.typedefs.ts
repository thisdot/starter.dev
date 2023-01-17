import gql from 'graphql-tag';

export const postTypeDefs = gql`
	type Post {
		id: ID!
		content: String!
	}

	type Query {
		"Simple hello world query that accepts a greeting"
		posts(id: ID): [Post]
	}

	type Mutation {
		"Simple hello world mutation that accepts a greeting"
		createPost(content: String!): Post
		updatePost(id: ID!, content: String!): Post
		deletePost(id: ID!): ID
	}
`;
