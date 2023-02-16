import gql from 'graphql-tag';

export const technologyTypeDefs = gql`
	"""
	Technology object
	"""
	type Technology {
		"The ID of the Technology"
		id: ID!
		"The name of the Technology"
		displayName: String!
	}

	type Query {
		"Returns a single Technology by ID"
		technology(id: ID!): Technology
		"Returns a list of Technologies"
		technologies: [Technology]!
	}

	input CreateTechnology {
		"Technology Name"
		displayName: String!
	}

	input UpdateTechnology {
		"Technology Name"
		displayName: String
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
