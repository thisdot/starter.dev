import gql from 'graphql-tag';
import { apolloServer } from '../../handlers/graphql';
import { GraphQLResponse } from '@apollo/server/src/externalTypes';
import assert from 'assert';

const MOCK_CONTENT = [
	'This is the test post content',
	'This is the updated test post content',
];

jest.mock('../../utils/contentful', () => {
	const MOCK_CONTENT = [
		'This is the test post content',
		'This is the updated test post content',
	];
	const MOCK_ID = 'xxx';
	const MOCK_CONTENTFUL_ENTRIES = {
		items: MOCK_CONTENT.map((content) => ({
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
			updatePost: {
				id: MOCK_ID,
				content: MOCK_CONTENT[1],
			},
		}),
		createEntry: jest.fn().mockReturnValue({
			...MOCK_CONTENTFUL_ENTRIES.items[0],
			publish: jest.fn().mockReturnValue({
				createPost: {
					id: MOCK_ID,
					content: MOCK_CONTENT[0],
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

describe('post queries and mutations', () => {
	let subject: any;
	let post: any;
	let content: string;

	beforeAll(async () => {
		content = 'This is the test post content';
		const MUTATION = gql`
			mutation CreatePostMutation($content: String!) {
				createPost(content: $content) {
					id
					content
				}
			}
		`;

		const res: GraphQLResponse = await apolloServer.executeOperation({
			query: MUTATION,
			variables: {
				content,
			},
		});

		assert(res.body.kind === 'single');
		expect(res.body.singleResult.errors).toBeUndefined();
		assert(res.body.singleResult.data);

		post = res.body.singleResult.data.createPost;
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

			subject = await apolloServer.executeOperation({
				query: QUERY,
			});
		});

		it('returns created post', () => {
			const createdPosts = subject.body.singleResult.data.posts;
			expect(true).toEqual(true);
			expect(createdPosts).toContainEqual({
				id: post.id,
				content: post.content,
			});
		});
	});

	describe('query post by id', () => {
		beforeAll(async () => {
			const QUERY = gql`
				query PostQuery($id: ID!) {
					posts(id: $id) {
						id
						content
					}
				}
			`;

			subject = await apolloServer.executeOperation({
				query: QUERY,
				variables: {
					id: post.id,
				},
			});
		});

		it('returns the post with the given id', () => {
			// console.log('by id', JSON.stringify(subject));
			expect(subject.body.singleResult.data).toEqual({
				posts: [
					{
						id: post.id,
						content: post.content,
					},
				],
			});
		});
	});

	describe('mutation createPost', () => {
		let created_post: any;

		beforeAll(async () => {
			const MUTATION = gql`
				mutation CreatePostMutation($content: String!) {
					createPost(content: $content) {
						id
						content
					}
				}
			`;

			subject = await apolloServer.executeOperation({
				query: MUTATION,
				variables: {
					content,
				},
			});

			created_post = subject.body.singleResult.data.createPost;
		});

		it('creates a post with the given content', () => {
			expect(created_post.content).toEqual(content);
		});
	});

	describe('mutation updatePost', () => {
		beforeAll(async () => {
			const MUTATION = gql`
				mutation UpdatePostMutation($id: ID!, $content: String!) {
					updatePost(id: $id, content: $content) {
						id
						content
					}
				}
			`;

			subject = await apolloServer.executeOperation({
				query: MUTATION,
				variables: {
					id: post.id,
					content: MOCK_CONTENT[1],
				},
			});
		});

		it('updates the post with the given content', () => {
			expect(subject.body.singleResult.data.updatePost).toEqual({
				id: post.id,
				content: MOCK_CONTENT[1],
			});
		});
	});
});
