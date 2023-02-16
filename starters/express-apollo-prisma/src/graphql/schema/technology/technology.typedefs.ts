import gql from 'graphql-tag';

export const technologyTypeDefs = gql`
	"""
	Technology object
	"""
	type Technology {
		"The ID of the Technology"
		id: ID!
		"The display name of the Technology"
		displayName: String!
		"The brief description of the Technology"
		description: String!
		"The link to the Technology's documentation"
		url: String!
	}

	type Query {
		"Returns a single Technology by ID"
		technology(id: ID!): Technology
		"Returns a list of Technologies"
		technologies: [Technology]!
	}

	input CreateTechnology {
		"Technology Display Name"
		displayName: String!
		description: String!
		url: String!
	}

	input UpdateTechnology {
		"Technology Display Name"
		displayName: String!
		description: String!
		url: String!
	}

	"""
	Technology mutations
	"""
	type Mutation {
		"Creates a new Technology"
		createTechnology(input: CreateTechnology!): Technology!
		"Updates a Technology"
		updateTechnology(id: ID!, input: UpdateTechnology!): Technology!
		"Removes a Technology"
		deleteTechnology(id: ID!): Boolean
	}
`;
