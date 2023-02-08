import gql from 'graphql-tag';
import { Query } from '../generated/types';
import assert from 'assert';
import { testServerExecuteOperation } from '../../utils/test';

type HelloQuery = Pick<Query, 'hello'>;

describe('hello query', () => {
	const MOCK_QUERY = gql`
		query HelloWorldQuery($greeting: String!) {
			hello(greeting: $greeting)
		}
	`;

	it('returns expected result', async () => {
		const MOCK_GREETING = 'MOCK_GREETING';

		const subject = await testServerExecuteOperation<HelloQuery>({
			query: MOCK_QUERY,
			variables: {
				greeting: MOCK_GREETING,
			},
		});
		expect(subject.body.kind).toEqual('single');
		assert(subject.body.kind === 'single');
		expect(subject.body.singleResult.data).toEqual({
			hello: `Hello, ${MOCK_GREETING}`,
		});
	});
});
