import gql from 'graphql-tag';
import { apolloServer } from '../../handlers/graphql';
import { GraphQLResponse } from '@apollo/server/src/externalTypes';
import { FormattedExecutionResult } from '@graphql-tools/executor';

describe('hello query', () => {
	let subject: GraphQLResponse;
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

	it('returns the salutation concatenated with the greeting', () => {
		expect(
			(
				subject.body as {
					singleResult: FormattedExecutionResult<Record<string, unknown>>;
				}
			).singleResult.data
		).toEqual({
			hello: `Hello, ${greeting}`,
		});
	});
});
