import gql from 'graphql-tag';

export const commentTypeDefs = gql`
	type Comment {
		id: ID!
		content: String!
	}

	type Query {
		"Comment(s): GET"
		comments(id: ID): [Comment]
	}

	type Mutation {
		"Comment: CRUD Operations"
		createComment(content: String!): Comment
		updateComment(id: ID!, content: String!): Comment
		deleteComment(id: ID!): ID
	}
`;
