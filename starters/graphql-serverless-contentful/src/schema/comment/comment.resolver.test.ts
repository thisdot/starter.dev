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
	let subject: any;
	let comment: any;
	let content: string;

	beforeAll(async () => {
		content = 'This is the test comment content';
		const MUTATION = gql`
			mutation CreateCommentMutation($content: String!) {
				createComment(content: $content) {
					id
					content
				}
			}
		`;

		const res: GraphQLResponse =
			await apolloServer.executeOperation<CommentQuery>({
				query: MUTATION,
				variables: {
					content,
				},
			});

		assert(res.body.kind === 'single');
		expect(res.body.singleResult.errors).toBeUndefined();
		assert(res.body.singleResult.data);

		comment = res.body.singleResult.data.createComment;
	});

	afterEach(async () => {
		subject = undefined;
	});

	describe('query posts', () => {
		beforeAll(async () => {
			const QUERY = gql`
				query {
					posts {
						id
						content
					}
				}
			`;

			subject = await apolloServer.executeOperation<CommentQuery>({
				query: QUERY,
			});
		});

		it('returns created comment', () => {
			const createdComments = subject.body.singleResult.data.posts;
			expect(createdComments).toContainEqual({
				id: comment.id,
				content: comment.content,
			});
		});
	});

	describe('query comment by id', () => {
		beforeAll(async () => {
			const QUERY = gql`
				query CommentQuery($id: ID!) {
					posts(id: $id) {
						id
						content
					}
				}
			`;

			subject = await apolloServer.executeOperation<CommentQuery>({
				query: QUERY,
				variables: {
					id: comment.id,
				},
			});
		});

		it('returns the comment with the given id', () => {
			// console.log('by id', JSON.stringify(subject));
			expect(subject.body.singleResult.data).toEqual({
				posts: [
					{
						id: comment.id,
						content: comment.content,
					},
				],
			});
		});
	});

	describe('mutation createComment', () => {
		let created_post: any;

		beforeAll(async () => {
			const MUTATION = gql`
				mutation CreateCommentMutation($content: String!) {
					createComment(content: $content) {
						id
						content
					}
				}
			`;

			subject = await apolloServer.executeOperation<CommentQuery>({
				query: MUTATION,
				variables: {
					content,
				},
			});

			created_post = subject.body.singleResult.data.createComment;
		});

		it('creates a comment with the given content', () => {
			expect(created_post.content).toEqual(content);
		});
	});

	describe('mutation updateComment', () => {
		beforeAll(async () => {
			const MUTATION = gql`
				mutation UpdateCommentMutation($id: ID!, $content: String!) {
					updateComment(id: $id, content: $content) {
						id
						content
					}
				}
			`;

			subject = await apolloServer.executeOperation<CommentQuery>({
				query: MUTATION,
				variables: {
					id: comment.id,
					content: MOCK_COMMENTS[1],
				},
			});
		});

		it('updates the comment with the given content', () => {
			expect(subject.body.singleResult.data.updateComment).toEqual({
				id: comment.id,
				content: MOCK_COMMENTS[1],
			});
		});
	});
});
