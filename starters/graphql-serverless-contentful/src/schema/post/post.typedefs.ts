import gql from 'graphql-tag';

export const postTypeDefs = gql`
	type Post {
		id: ID!
		content: String!
	}

	type Query {
		"Get Post"
		posts(id: ID): [Post]
	}

	type Mutation {
		"CRUD operations"
		createPost(content: String!): Post
		updatePost(id: ID!, content: String!): Post
		deletePost(id: ID!): ID
	}
`;
