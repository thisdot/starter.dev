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
		technology(id: ID!): Technology
		technologies(offset: Int, limit: Int): [Technology!]
	}

	type Mutation {
		"Technology: create, read and delete operations"
		createTechnology(displayName: String!, description: String, url: String): Technology
		updateTechnology(id: ID!, fields: TechnologyUpdateFields): Technology
		deleteTechnology(id: ID!): ID
	}

	input TechnologyUpdateFields {
		"Mutable fields of a technology entity"
		displayName: String
		description: String
		url: String
	}
`;
