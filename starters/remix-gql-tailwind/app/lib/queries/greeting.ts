import { gql } from 'graphql-request'

export const GREETING_QUERY = gql`
query Greeting($greeting: String!) 
{
  hello(greeting: $greeting)
}
`;