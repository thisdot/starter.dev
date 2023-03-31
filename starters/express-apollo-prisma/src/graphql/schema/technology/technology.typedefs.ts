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
		"A brief description of the Technology"
		description: String
		"The link to the Technology's documentation"
		url: String
	}

	"""
	Pagination Technology Node
	"""
	type TechnologyNode {
		"Current Cursor for Entity Node"
		cursor: Int!
		"Technology Entity Node"
		node: Technology!
	}

	"""
	Pagination Information
	"""
	type PageInformation {
		"Shows if there is a page after"
		hasNextPage: Boolean!
		"Shows if there is a page before"
		hasPreviousPage: Boolean!
		"First cursor in page"
		startCursor: Int
		"Last cursor in page"
		endCursor: Int
	}

	"""
	A collection of technologies
	"""
	type TechnologyCollection {
		"Identifies the total count of technology records in data source"
		totalCount: Int!
		"A list of records of the requested page"
		edges: [TechnologyNode]!
		"Pagination Information"
		pageInfo: PageInformation!
	}

	"""
	Technology queries
	"""
	type Query {
		"Returns a single Technology by ID"
		technology(id: ID!): Technology
		"Returns a list of Technologies"
		technologies(first: Int = 5, after: Int): TechnologyCollection!
	}

	input CreateTechnology {
		"Technology Name"
		displayName: String!
		"A brief description of the Technology"
		description: String
		"The link to the Technology's documentation"
		url: String
	}

	input UpdateTechnology {
		"Technology Name"
		displayName: String
		"A brief description of the Technology"
		description: String
		"The link to the Technology's documentation"
		url: String
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
