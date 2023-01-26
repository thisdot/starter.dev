import gql from 'graphql-tag';
import { apolloServer } from '../../handlers/graphql';
import { GraphQLResponse } from '@apollo/server/src/externalTypes';
import assert from 'assert';
import { Query } from '../../generated/graphql';
import { client } from '../../utils/contentful';
import { Environment, Space } from 'contentful-management';

type TechnologyQuery = Pick<Query, 'technology'>;

jest.mock('../../utils/contentful', () => ({
	client: {},
}));

const MOCK_TECHNOLOGIES = [
	{
		id: '4f997875-a96d-4c84-ba43-39afd764168d',
		displayName: 'GraphQL',
		description:
			'GraphQL provides a strong-typing system to better understand and utilize our API to retrieve and interact with our data.',
		url: 'https://graphql.framework.dev/',
	},
	{
		id: '2e6c7d25-8b03-4348-8329-cc4185225c71',
		displayName: 'Node.js',
		description:
			'Node.js® is an open-source, cross-platform JavaScript runtime environment.',
		url: 'https://nodejs.framework.dev/',
	},
];
const MOCK_CONTENTFUL_ENTRIES = {
	items: MOCK_TECHNOLOGIES.map(({ id, displayName, description, url }) => ({
		sys: {
			id,
		},
		fields: {
			displayName: {
				'en-US': displayName,
			},
			description: {
				'en-US': description,
			},
			url: {
				'en-US': url,
			},
		},
		publish: () => undefined,
		update: () => undefined,
	})),
};

const getEntries = jest.fn(() => MOCK_CONTENTFUL_ENTRIES);
const getEntry = jest.fn(() => MOCK_CONTENTFUL_ENTRIES.items[1]);
const createEntry = jest.fn(() => MOCK_CONTENTFUL_ENTRIES.items[0]);

client.getSpace = () =>
	Promise.resolve({
		getEnvironment: () =>
			Promise.resolve({
				getEntry,
				getEntries,
				createEntry,
			} as unknown as Environment),
	} as unknown as Space);

describe('technology queries and mutations', () => {
	describe('query technologies', () => {
		it('returns all technologies', async () => {
			const query = gql`
				query {
					technology {
						id
						displayName
						description
						url
					}
				}
			`;

			const subject: GraphQLResponse =
				await apolloServer.executeOperation<TechnologyQuery>({ query });

			assert(subject.body.kind === 'single');
			expect(subject.body.singleResult.errors).toBeUndefined();
			expect(getEntries).toHaveBeenCalledWith({ content_type: 'technology' });
			expect(subject.body.singleResult.data?.technology).toEqual(
				MOCK_TECHNOLOGIES
			);
		});
	});

	describe('query technology by id', () => {
		it('returns the technology with the given id', async () => {
			const query = gql`
				query TechnologyQuery($id: ID!) {
					technology(id: $id) {
						id
						displayName
						description
						url
					}
				}
			`;

			const subject = await apolloServer.executeOperation<TechnologyQuery>({
				query,
				variables: { id: MOCK_TECHNOLOGIES[1].id },
			});

			assert(subject.body.kind === 'single');
			expect(subject.body.singleResult.errors).toBeUndefined();
			expect(subject.body.singleResult.data?.technology).toEqual([
				MOCK_TECHNOLOGIES[1],
			]);
			expect(getEntry).toHaveBeenCalledWith(MOCK_TECHNOLOGIES[1].id);
		});
	});

	describe('mutation createTechnology', () => {

		it('creates a technology with the given content', async () => {
			const query = gql`
				mutation CreateTechnologyMutation(
					$displayName: String!
					$description: String
					$url: String
				) {
					createTechnology(
						displayName: $displayName
						description: $description
						url: $url
					) {
						id
						displayName
						description
						url
					}
				}
			`;

			const subject: GraphQLResponse =
				await apolloServer.executeOperation<TechnologyQuery>({
					query,
					variables: MOCK_TECHNOLOGIES[0],
				});

			assert(subject.body.kind === 'single');
			expect(subject.body.singleResult.errors).toBeUndefined();
			expect(subject.body.singleResult.data?.createTechnology).toEqual(
				MOCK_TECHNOLOGIES[0]
			);
			expect(createEntry).toHaveBeenCalledWith('technology', {
				fields: MOCK_CONTENTFUL_ENTRIES.items[0].fields,
			});
		});
	});

	describe('mutation updateTechnology', () => {
		it('updates the technology with the given content', async () => {
			const query = gql`
				mutation UpdateTechnologyMutation(
					$id: ID!
					$displayName: String
					$description: String
					$url: String
				) {
					updateTechnology(
						id: $id
						displayName: $displayName
						description: $description
						url: $url
					) {
						id
						displayName
						description
						url
					}
				}
			`;

			const subject: GraphQLResponse =
				await apolloServer.executeOperation<TechnologyQuery>({
					query,
					variables: MOCK_TECHNOLOGIES[1],
				});

			assert(subject.body.kind === 'single');
			expect(subject.body.singleResult.errors).toBeUndefined();
			expect(subject.body.singleResult.data?.updateTechnology).toEqual(
				MOCK_TECHNOLOGIES[1]
			);
		});
	});
});
