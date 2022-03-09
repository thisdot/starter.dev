import { gql } from 'graphql-request'

export const ALL_COUNTRIES_QUERY = gql`
query Countries 
{
  countries {
    name
    native
    capital
    emoji
    emojiU
    currency
    languages {
      code
      name
    }
  }
}
`;