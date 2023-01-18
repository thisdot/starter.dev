import gql from 'graphql-tag';
import { apolloServer } from '../../handlers/graphql';

describe('hello query', () => {
  let subject: any;
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

    console.log('subject', subject.data);
  });

  afterAll(() => {
    subject = undefined;
  });

  it('returns the salutation concatenated with the greeting', () => {
    expect(subject.body.singleResult.data).toEqual({
      hello: `Hello, ${greeting}`,
    });
  });
});
