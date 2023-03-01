import gql from 'graphql-tag';

export const technologyTypeDefs = gql`
	type Technology {
		id: ID!
		displayName: String!
		description: String
		url: String
	}

	type Query {
		"Technology: GET"
		technology(id: ID): [Technology]
	}

	type Mutation {
		"Technology: create, read and delete operations"
		createTechnology(
			displayName: String!
			description: String
			url: String
		): Technology
		updateTechnology(
			id: ID!
			displayName: String
			description: String
			url: String
		): Technology
		deleteTechnology(id: ID!): ID
	}
`;
