import { gql } from '../../../deps.ts';

export const technologyTypes = gql`
  type Technology {
    id: String
    displayName: String
    description: String
    url: String
    createdAt: String
    updatedAt: String
  }

  input TechnologyInput {
    displayName: String
    description: String
    url: String
  }

  type ResolveType {
    done: Boolean
  }

  type Query {
    getTechnologies: [Technology!]
    getTechnology(id: String): Technology
  }

  type Mutation {
    createTechnology(technology: TechnologyInput): Technology
    updateTechnology(id: String, input: TechnologyInput): ResolveType!
    deleteTechnologyById(id: String): ResolveType!
  }
`;
