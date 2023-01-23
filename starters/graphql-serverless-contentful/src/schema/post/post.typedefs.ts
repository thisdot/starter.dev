import gql from 'graphql-tag';

export const postTypeDefs = gql`
	type Post {
		id: ID!
		content: String!
	}

	type Query {
		"Post(s): GET"
		posts(id: ID): [Post]
	}

	type Mutation {
		"Post: CRUD operations"
		createPost(content: String!): Post
		updatePost(id: ID!, content: String!): Post
		deletePost(id: ID!): ID
	}
`;
