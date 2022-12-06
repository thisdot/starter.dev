import { gql } from '../../../deps.ts';

export const technologySchema = gql`
  type Technology {
    id: String
    displayName: String
    description: String
    url: String
  }
`;
