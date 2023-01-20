import gql from 'graphql-tag';

export const commentTypeDefs = gql`
	type Comment {
		id: ID!
		content: String!
	}

	type Query {
		"Get Comment"
		comments(id: ID): [Comment]
	}

	type Mutation {
		"CRUD Operations"
		createComment(content: String!): Comment
		updateComment(id: ID!, content: String!): Comment
		deleteComment(id: ID!): ID
	}
`;
