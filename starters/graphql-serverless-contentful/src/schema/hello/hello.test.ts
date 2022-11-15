import gql from 'graphql-tag';
import { apolloServer } from '../../handlers/graphql';

describe('hello query', () => {
  let subject;
  let greeting: string;

  beforeAll(async () => {
    greeting = 'World!';
    const QUERY = gql`
      query HelloWorldQuery($greeting: String!) {
        hello(greeting: $greeting)
      }
    `;
    subject = await apolloServer.executeOperation({
      query: QUERY,
      variables: {
        greeting,
      },
    });
  });

  afterAll(() => {
    subject = undefined;
  });

  it('returns the salutation concatenated with the greeting', () => {
    expect(subject.data).toEqual({
      hello: `Hello, ${greeting}`,
    });
  });
});

