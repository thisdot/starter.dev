import { gql } from 'apollo-server-lambda';
import { apolloServerExecute } from '../../utils/test/apolloTestServer';

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
    subject = await apolloServerExecute({
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
