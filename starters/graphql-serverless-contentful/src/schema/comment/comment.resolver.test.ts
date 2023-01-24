import gql from 'graphql-tag';
import { apolloServer } from '../../handlers/graphql';
import { GraphQLResponse } from '@apollo/server/src/externalTypes';
import assert from 'assert';
import { Query } from '../../generated/graphql';
type CommentQuery = Pick<Query, 'comments'>;

const MOCK_COMMENTS = [
	'This is the test comment content',
	'This is the updated test comment content',
];
const MOCK_ID = 'xxx';

jest.mock('../../utils/contentful', () => {
	const MOCK_COMMENTS = [
		'This is the test comment content',
		'This is the updated test comment content',
	];
	const MOCK_ID = 'xxx';
	const MOCK_CONTENTFUL_ENTRIES = {
		items: MOCK_COMMENTS.map((content) => ({
			sys: {
				id: MOCK_ID,
			},
			fields: {
				content: {
					'en-US': content,
				},
			},
		})),
	};

	const MOCK_CONTENTFUL_ENVIRONMENT = {
		getEntry: jest.fn().mockReturnValue({
			...MOCK_CONTENTFUL_ENTRIES.items[0],
			publish: jest.fn().mockReturnValue({}),
			update: jest.fn().mockReturnValue({}),
			updateComment: {
				id: MOCK_ID,
				content: MOCK_COMMENTS[1],
			},
		}),
		createEntry: jest.fn().mockReturnValue({
			...MOCK_CONTENTFUL_ENTRIES.items[0],
			publish: jest.fn().mockReturnValue({
				createComment: {
					id: MOCK_ID,
					content: MOCK_COMMENTS[0],
				},
			}),
		}),
		getEntries: jest.fn().mockReturnValue(MOCK_CONTENTFUL_ENTRIES),
	};
	const MOCK_CONTENTFUL_SPACE = {
		getEnvironment: jest.fn().mockReturnValue(MOCK_CONTENTFUL_ENVIRONMENT),
	};
	const MOCK_CONTENTFUL_CLIENT = {
		client: {
			getSpace: jest.fn().mockReturnValue(MOCK_CONTENTFUL_SPACE),
		},
	};
	return MOCK_CONTENTFUL_CLIENT;
});

describe('comment queries and mutations', () => {
	describe('query comments', () => {
		it('returns created comment', async () => {
			const QUERY = gql`
				query {
					comments {
						id
						content
					}
				}
			`;

			const subject: GraphQLResponse =
				await apolloServer.executeOperation<CommentQuery>({
					query: QUERY,
				});

			assert(subject.body.kind === 'single');
			expect(subject.body.singleResult.errors).toBeUndefined();
			assert(subject.body.singleResult.data);

			const createdComments = subject.body.singleResult.data.comments;
			expect(createdComments).toContainEqual({
				id: MOCK_ID,
				content: MOCK_COMMENTS[0],
			});
		});
	});

	describe('query comment by id', () => {
		it('returns the comment with the given id', async () => {
			const QUERY = gql`
				query CommentQuery($id: ID!) {
					comments(id: $id) {
						id
						content
					}
				}
			`;

			const subject = await apolloServer.executeOperation<CommentQuery>({
				query: QUERY,
				variables: {
					id: MOCK_ID,
				},
			});

			assert(subject.body.kind === 'single');
			expect(subject.body.singleResult.errors).toBeUndefined();
			assert(subject.body.singleResult.data);

			expect(subject.body.singleResult.data).toEqual({
				comments: [
					{
						id: MOCK_ID,
						content: MOCK_COMMENTS[0],
					},
				],
			});
		});
	});

	describe('mutation createComment', () => {
		let created_comment: any;

		it('creates a comment with the given content', async () => {
			const MUTATION = gql`
				mutation CreateCommentMutation($content: String!) {
					createComment(content: $content) {
						id
						content
					}
				}
			`;

			const subject: GraphQLResponse =
				await apolloServer.executeOperation<CommentQuery>({
					query: MUTATION,
					variables: {
						content: MOCK_COMMENTS[0],
					},
				});

			assert(subject.body.kind === 'single');
			expect(subject.body.singleResult.errors).toBeUndefined();
			assert(subject.body.singleResult.data);

			created_comment = subject.body.singleResult.data.createComment;

			expect(created_comment.content).toEqual(MOCK_COMMENTS[0]);
		});
	});

	describe('mutation updateComment', () => {
		it('updates the comment with the given content', async () => {
			const MUTATION = gql`
				mutation UpdateCommentMutation($id: ID!, $content: String!) {
					updateComment(id: $id, content: $content) {
						id
						content
					}
				}
			`;

			const subject: GraphQLResponse =
				await apolloServer.executeOperation<CommentQuery>({
					query: MUTATION,
					variables: {
						id: MOCK_ID,
						content: MOCK_COMMENTS[1],
					},
				});

			assert(subject.body.kind === 'single');
			expect(subject.body.singleResult.errors).toBeUndefined();
			assert(subject.body.singleResult.data);

			expect(subject.body.singleResult.data.updateComment).toEqual({
				id: MOCK_ID,
				content: MOCK_COMMENTS[1],
			});
		});
	});
});
