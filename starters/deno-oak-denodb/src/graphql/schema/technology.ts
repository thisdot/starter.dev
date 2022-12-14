import { gql } from '../../../deps.ts';

export const technologyTypes = gql`
  type Technology {
    id: String!
    displayName: String!
    description: String!
    url: String!
    createdAt: String!
    updatedAt: String!
  }

  input CreateTechnologyInput {
    displayName: String!
    description: String!
    url: String!
  }

	input UpdateTechnologyInput {
    displayName: String
    description: String
    url: String
  }

  type ResolveType {
    done: Boolean
  }

  type Query {
    getTechnologies: [Technology!]!
    getTechnology(id: String!): Technology
  }

  type Mutation {
    createTechnology(input: CreateTechnologyInput!): Technology
    updateTechnology(id: String!, input: UpdateTechnologyInput!): ResolveType!
    deleteTechnologyById(id: String!): ResolveType!
  }
`;
