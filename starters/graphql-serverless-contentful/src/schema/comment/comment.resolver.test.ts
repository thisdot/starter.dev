import gql from 'graphql-tag';
import { apolloServer } from '../../handlers/graphql';
import { GraphQLResponse } from '@apollo/server/src/externalTypes';
import { FormattedExecutionResult } from '@graphql-tools/executor';
import assert from 'assert';

jest.mock('../../utils/contentful', () => {
	const MOCK_CONTENTFUL_ENTRIES = {
		items: [],
	};
	const MOCK_CONTENTFUL_ENVIRONMENT = {
		getEntries: jest.fn().mockReturnValue(MOCK_CONTENTFUL_ENTRIES),
	};
	const MOCK_CONTENTFUL_SPACE = {
		getEnvironment: jest.fn().mockReturnValue(MOCK_CONTENTFUL_ENVIRONMENT),
	};
	const MOCK_CONTENTFUL_CLIENT = {
		getSpace: jest.fn().mockReturnValue(MOCK_CONTENTFUL_SPACE),
	};
	return MOCK_CONTENTFUL_CLIENT;
});

beforeAll(async () => {
	// const space = await client.getSpace(`${process.env.CONTENTFUL_SPACE_ID}`);
	// const environment = await space.getEnvironment(
	//     `${process.env.CONTENTFUL_ENVIRONMENT}`
	// );
	// MOCK THESE I GUESS
});

describe('comment resolver', () => {
	const MOCK_COMMENTS = [
		{
			content: 'Comment 1',
		},
		{
			content: 'Comment 2',
		},
	];

	it('adds comment', async () => {
		const QUERY = gql`
			mutation Mutation($content: String!) {
				createComment(content: $content) {
					content
					id
				}
			}
		`;
		const subject: GraphQLResponse = await apolloServer.executeOperation<{
			content: string;
		}>({
			query: QUERY,
			variables: {
				content: MOCK_COMMENTS[0].content,
			},
		});

		assert(subject.body.kind === 'single');
		expect(subject.body.singleResult.errors).toBeUndefined();
		console.log(subject.body.singleResult);

		expect(subject.body).toBeTruthy();
	});

	// it('returns a comment', async () => {
	// 	const QUERY = gql`
	// 		query GetComment($content: String!) {
	// 			comments(id: $id)
	// 		}
	// 	`;
	// 	const subject: GraphQLResponse = await apolloServer.executeOperation({
	// 		query: QUERY,
	// 		variables: {
	// 			id: 1,
	// 		},
	// 	});

	// 	expect(
	// 		(
	// 			subject.body as {
	// 				singleResult: FormattedExecutionResult<Record<string, unknown>>;
	// 			}
	// 		).singleResult.data
	// 	).toBeTruthy();
	// });

	// it('returns all comments', async () => {
	// 	const QUERY = gql`
	// 		query GetAllComments {
	// 			comments {
	// 				id
	// 				content
	// 			}
	// 		}
	// 	`;
	// 	const subject: GraphQLResponse = await apolloServer.executeOperation({
	// 		query: QUERY,
	// 	});

	// 	expect(
	// 		(
	// 			subject.body as {
	// 				singleResult: FormattedExecutionResult<Record<string, unknown>>;
	// 			}
	// 		).singleResult.data[0].content
	// 	).toEqual(MOCK_COMMENTS[0].content);
	// });

	// it('update a comment', async () => {
	// 	const QUERY = gql`
	// 		query GetAllComments {
	// 			comments {
	// 				id
	// 				content
	// 			}
	// 		}
	// 	`;
	// 	const subject: GraphQLResponse = await apolloServer.executeOperation({
	// 		query: QUERY,
	// 	});

	// 	expect(
	// 		(
	// 			subject.body as {
	// 				singleResult: FormattedExecutionResult<Record<string, unknown>>;
	// 			}
	// 		).singleResult.data
	// 	).toBeTruthy();
	// });
});
