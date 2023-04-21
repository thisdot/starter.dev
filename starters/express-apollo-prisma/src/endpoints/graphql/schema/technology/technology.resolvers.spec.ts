import gql from 'graphql-tag';
import {
	Query,
	Mutation,
	Technology,
	CreateTechnology,
	UpdateTechnology,
	QuerytechnologiesArgs,
	TechnologyCollectionPage,
} from '../generated/types';
import assert from 'assert';
import { testServerExecuteOperation } from '../../../../mocks/graphql-server';
import {
	createMockTechnologyDataSource,
	createMockTechnologyEntityCollectionPage,
} from '../../../../mocks/technology-entity';

import { GraphQLResponse } from '@apollo/server';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { ServerContext } from '../../server-context';

import { TechnologyEntity } from '@prisma/client';
import { mapTechnology, mapTechnologyCollectionPage } from '../../mappers';

type QueryTechnology = Pick<Query, 'technology'>;
type QueryTechnologies = Pick<Query, 'technologies'>;
type MutationCreateTechnology = Pick<Mutation, 'createTechnology'>;
type MutationUpdateTechnology = Pick<Mutation, 'updateTechnology'>;
type MutationDeleteTechnology = Pick<Mutation, 'deleteTechnology'>;

const MOCK_EXISTING_ID = 123;
const MOCK_EXISTING_ID_STRING = String(MOCK_EXISTING_ID);
const MOCK_EXISTING_TECHNOLOGY_ENTITY: TechnologyEntity = {
	id: MOCK_EXISTING_ID,
	displayName: 'MOCK_TECHNOLOGY',
	description: 'MOCK_TECHNOLOGY_DESCRIPTION',
	url: 'MOCK_TECHNOLOGY_URL',
};
const MOCK_NON_EXISTING_ID = 321;
const MOCK_NON_EXISTING_ID_STRING = String(MOCK_NON_EXISTING_ID);

const MOCK_QUERY_TECHNOLOGY = gql`
	query TechnologyQuery($id: ID!) {
		technology(id: $id) {
			id
			displayName
			description
			url
		}
	}
`;

const MOCK_QUERY_TECHNOLOGIES_PAGINATION_DEFAULT = gql`
	query TechnologiesQueryPaginationArgumentsDefualt {
		technologies {
			items {
				description
				displayName
				id
				url
			}
			totalCount
		}
	}
`;

const MOCK_VARIABLES_TECHNOLOGIES_PAGINATION_DEFAULT: QuerytechnologiesArgs = {};

const MOCK_QUERY_TECHNOLOGIES_PAGINATION_CUSTOM = gql`
	query TechnologiesQueryPaginationArgumentsCustom($limit: Int, $offset: Int) {
		technologies(limit: $limit, offset: $offset) {
			items {
				description
				displayName
				id
				url
			}
			totalCount
		}
	}
`;
const MOCK_VARIABLES_TECHNOLOGIES_PAGINATION_CUSTOM: QuerytechnologiesArgs = {
	limit: 10,
	offset: 20,
};

const MOCK_TECHNOLOGY_DATASOURCE = createMockTechnologyDataSource();
const MOCK_CONTEXT: ServerContext = {
	dataSources: {
		technologyDataSource: MOCK_TECHNOLOGY_DATASOURCE,
	},
};

const EXPECTED_RESULT_EXISTING_TECHNOLOGY: Technology = {
	id: '123',
	displayName: 'MOCK_TECHNOLOGY',
	description: 'MOCK_TECHNOLOGY_DESCRIPTION',
	url: 'MOCK_TECHNOLOGY_URL',
};

const MOCK_MUTATION_CREATE_TECHNOLOGY = gql`
	mutation CreateTechnologyMutation($input: CreateTechnology!) {
		createTechnology(input: $input) {
			id
			displayName
			description
			url
		}
	}
`;

const MOCK_INPUT_CREATE_TECHNOLOGY: CreateTechnology = {
	displayName: 'MOCK_TECHNOLOGY',
	description: 'MOCK_TECHNOLOGY_DESCRIPTION',
	url: 'MOCK_TECHNOLOGY_URL',
};

const MOCK_MUTATION_UPDATE_TECHNOLOGY = gql`
	mutation UpdateTechnologyMutation($id: ID!, $input: UpdateTechnology!) {
		updateTechnology(id: $id, input: $input) {
			id
			displayName
			description
			url
		}
	}
`;

const MOCK_INPUT_UPDATE_TECHNOLOGY: UpdateTechnology = {
	displayName: 'MOCK_TECHNOLOGY',
	description: 'MOCK_TECHNOLOGY_DESCRIPTION',
	url: 'MOCK_TECHNOLOGY_URL',
};

const MOCK_MUTATION_DELETE_TECHNOLOGY = gql`
	mutation DeleteTechnologyMutation($id: ID!) {
		deleteTechnology(id: $id)
	}
`;

jest.mock('../../mappers/technology', () => ({
	mapTechnology: jest.fn().mockReturnValue({
		id: '123',
		displayName: 'MOCK_TECHNOLOGY',
		description: 'MOCK_TECHNOLOGY_DESCRIPTION',
		url: 'MOCK_TECHNOLOGY_URL',
	}),
	mapTechnologyCollectionPage: jest.fn(),
}));
const MOCK_MAP_TECHNOLOGY = mapTechnology as jest.Mock<Technology, [TechnologyEntity]>;
const MOCK_MAP_TECHNOLOGY_COLLECTION_PAGE = mapTechnologyCollectionPage as jest.MockedFn<
	typeof mapTechnologyCollectionPage
>;

describe('technologyResolvers', () => {
	describe('.Query', () => {
		describe('.technology', () => {
			describe('when called with existing valid id', () => {
				let response: GraphQLResponse<QueryTechnology>;

				beforeAll(async () => {
					MOCK_TECHNOLOGY_DATASOURCE.getTechnologyById.mockResolvedValue(
						MOCK_EXISTING_TECHNOLOGY_ENTITY
					);
					response = await testServerExecuteOperation<QueryTechnology>(
						{
							query: MOCK_QUERY_TECHNOLOGY,
							variables: {
								id: MOCK_EXISTING_ID_STRING,
							},
						},
						MOCK_CONTEXT
					);
				});

				afterAll(() => {
					MOCK_TECHNOLOGY_DATASOURCE.getTechnologyById.mockReset();
					MOCK_MAP_TECHNOLOGY.mockClear();
				});

				it('calls TechnologyDataSource getTechnologyById method once with expected argument', () => {
					expect(MOCK_TECHNOLOGY_DATASOURCE.getTechnologyById).toHaveBeenCalledTimes(1);
					expect(MOCK_TECHNOLOGY_DATASOURCE.getTechnologyById).toHaveBeenCalledWith(
						MOCK_EXISTING_ID
					);
				});

				it('calls mapTechnology mapper function once with expected argument', () => {
					expect(MOCK_MAP_TECHNOLOGY).toHaveBeenCalledTimes(1);
					expect(MOCK_MAP_TECHNOLOGY).toHaveBeenCalledWith(MOCK_EXISTING_TECHNOLOGY_ENTITY);
				});

				it('returns expected result', async () => {
					expect(response.body.kind).toEqual('single');
					assert(response.body.kind === 'single');
					expect(response.body.singleResult.errors).toBeUndefined();
					expect(response.body.singleResult.data).toEqual({
						technology: EXPECTED_RESULT_EXISTING_TECHNOLOGY,
					});
				});
			});

			describe('when called with non-existing valid id', () => {
				let response: GraphQLResponse<QueryTechnology>;

				beforeAll(async () => {
					MOCK_TECHNOLOGY_DATASOURCE.getTechnologyById.mockResolvedValue(null);
					response = await testServerExecuteOperation<QueryTechnology>(
						{
							query: MOCK_QUERY_TECHNOLOGY,
							variables: {
								id: MOCK_NON_EXISTING_ID_STRING,
							},
						},
						MOCK_CONTEXT
					);
				});

				afterAll(() => {
					MOCK_TECHNOLOGY_DATASOURCE.getTechnologyById.mockReset();
					MOCK_MAP_TECHNOLOGY.mockClear();
				});

				it('calls TechnologyDataSource getTechnologyById method once with expected argument', () => {
					expect(MOCK_TECHNOLOGY_DATASOURCE.getTechnologyById).toHaveBeenCalledTimes(1);
					expect(MOCK_TECHNOLOGY_DATASOURCE.getTechnologyById).toHaveBeenCalledWith(
						MOCK_NON_EXISTING_ID
					);
				});

				it('returns expected error result', async () => {
					expectSingleErrorResponse(
						response,
						{ technology: null },
						{
							message: 'Technology not found.',
							path: ['technology'],
							extensions: { code: ApolloServerErrorCode.PERSISTED_QUERY_NOT_FOUND },
						}
					);
				});
			});

			describe('when called with invalid id', () => {
				let response: GraphQLResponse<QueryTechnology>;

				beforeAll(async () => {
					response = await testServerExecuteOperation<QueryTechnology>(
						{
							query: MOCK_QUERY_TECHNOLOGY,
							variables: {
								id: 'INVALID_NUMBER_ID',
							},
						},
						MOCK_CONTEXT
					);
				});

				afterAll(() => {
					MOCK_TECHNOLOGY_DATASOURCE.getTechnologyById.mockClear();
					MOCK_MAP_TECHNOLOGY.mockClear();
				});

				it('returns expected error result', async () => {
					expectSingleErrorResponse(
						response,
						{ technology: null },
						{
							message: 'Invalid argument value',
							path: ['technology'],
							extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT, argumentName: 'id' },
						}
					);
				});
			});
		});

		describe('.technologies', () => {
			describe('when called', () => {
				const MOCK_RESULT_TECHNOLOGY_COLLECTION_PAGE: TechnologyCollectionPage = {
					totalCount: 987,
					items: [
						{
							displayName: 'MOCK_DISPLAY_NAME_RESULT',
							description: 'MOCK_DESCRIPTION_RESULT',
							id: 'MOCK_ID_RESULT',
							url: 'MOCK_URL_RESULT',
						},
					],
				};

				describe.each([
					[
						'with default pagination arguments',
						MOCK_QUERY_TECHNOLOGIES_PAGINATION_DEFAULT,
						MOCK_VARIABLES_TECHNOLOGIES_PAGINATION_DEFAULT,
						createMockTechnologyEntityCollectionPage(5, 30),
						5,
						0,
					],
					[
						'with custom pagination arguments',
						MOCK_QUERY_TECHNOLOGIES_PAGINATION_CUSTOM,
						MOCK_VARIABLES_TECHNOLOGIES_PAGINATION_CUSTOM,
						createMockTechnologyEntityCollectionPage(10, 50),
						Number(MOCK_VARIABLES_TECHNOLOGIES_PAGINATION_CUSTOM.limit),
						Number(MOCK_VARIABLES_TECHNOLOGIES_PAGINATION_CUSTOM.offset),
					],
				])(
					'%s',
					(
						_statement,
						mockQuery,
						mockVariables,
						mockCollectionPage,
						expectedLimit,
						expectedOffset
					) => {
						let response: GraphQLResponse<QueryTechnologies>;

						beforeAll(async () => {
							MOCK_TECHNOLOGY_DATASOURCE.getTechnologies.mockResolvedValue(mockCollectionPage);
							MOCK_MAP_TECHNOLOGY_COLLECTION_PAGE.mockReturnValue(
								MOCK_RESULT_TECHNOLOGY_COLLECTION_PAGE
							);
							response = await testServerExecuteOperation<QueryTechnologies>(
								{
									query: mockQuery,
									variables: mockVariables,
								},
								MOCK_CONTEXT
							);
						});

						afterAll(() => {
							MOCK_TECHNOLOGY_DATASOURCE.getTechnologies.mockReset();
							MOCK_MAP_TECHNOLOGY_COLLECTION_PAGE.mockReset();
						});

						it('calls TechnologyDataSource getTechnologies method once', () => {
							expect(MOCK_TECHNOLOGY_DATASOURCE.getTechnologies).toHaveBeenCalledTimes(1);
							expect(MOCK_TECHNOLOGY_DATASOURCE.getTechnologies).toHaveBeenCalledWith(
								expectedLimit,
								expectedOffset
							);
						});

						it('calls mapTechnology mapper function for each technology entity', () => {
							expect(MOCK_MAP_TECHNOLOGY_COLLECTION_PAGE).toHaveBeenCalledTimes(1);
							expect(MOCK_MAP_TECHNOLOGY_COLLECTION_PAGE).toHaveBeenCalledWith(mockCollectionPage);
						});

						it('returns expected result', async () => {
							expect(response.body.kind).toEqual('single');
							assert(response.body.kind === 'single');
							expect(response.body.singleResult.errors).toBeUndefined();
							expect(response.body.singleResult.data).toEqual({
								technologies: MOCK_RESULT_TECHNOLOGY_COLLECTION_PAGE,
							});
						});
					}
				);
			});
		});
	});

	describe('.Mutation', () => {
		describe('.createTechnology', () => {
			describe('when called with valid input', () => {
				let response: GraphQLResponse<MutationCreateTechnology>;

				beforeAll(async () => {
					MOCK_TECHNOLOGY_DATASOURCE.createTechnology.mockResolvedValue(
						MOCK_EXISTING_TECHNOLOGY_ENTITY
					);
					response = await testServerExecuteOperation<MutationCreateTechnology>(
						{
							query: MOCK_MUTATION_CREATE_TECHNOLOGY,
							variables: {
								input: MOCK_INPUT_CREATE_TECHNOLOGY,
							},
						},
						MOCK_CONTEXT
					);
				});

				afterAll(() => {
					MOCK_TECHNOLOGY_DATASOURCE.createTechnology.mockReset();
					MOCK_MAP_TECHNOLOGY.mockClear();
				});

				it('calls TechnologyDataSource createTechnology method once with expected argument', () => {
					expect(MOCK_TECHNOLOGY_DATASOURCE.createTechnology).toHaveBeenCalledTimes(1);
					expect(MOCK_TECHNOLOGY_DATASOURCE.createTechnology).toHaveBeenCalledWith(
						MOCK_INPUT_CREATE_TECHNOLOGY
					);
				});

				it('calls mapTechnology mapper function once with expected argument', () => {
					expect(MOCK_MAP_TECHNOLOGY).toHaveBeenCalledTimes(1);
					expect(MOCK_MAP_TECHNOLOGY).toHaveBeenCalledWith(MOCK_EXISTING_TECHNOLOGY_ENTITY);
				});

				it('returns expected result', () => {
					expect(response.body.kind).toEqual('single');
					assert(response.body.kind === 'single');
					expect(response.body.singleResult.errors).toBeUndefined();
					expect(response.body.singleResult.data).toEqual({
						createTechnology: EXPECTED_RESULT_EXISTING_TECHNOLOGY,
					});
				});
			});
		});

		describe('.updateTechnology', () => {
			describe('when called with valid input', () => {
				let response: GraphQLResponse<MutationUpdateTechnology>;

				beforeAll(async () => {
					MOCK_TECHNOLOGY_DATASOURCE.updateTechnology.mockResolvedValue(
						MOCK_EXISTING_TECHNOLOGY_ENTITY
					);
					response = await testServerExecuteOperation<MutationUpdateTechnology>(
						{
							query: MOCK_MUTATION_UPDATE_TECHNOLOGY,
							variables: {
								id: MOCK_EXISTING_ID_STRING,
								input: MOCK_INPUT_UPDATE_TECHNOLOGY,
							},
						},
						MOCK_CONTEXT
					);
				});

				afterAll(() => {
					MOCK_TECHNOLOGY_DATASOURCE.updateTechnology.mockReset();
					MOCK_MAP_TECHNOLOGY.mockClear();
				});

				it('calls TechnologyDataSource updateTechnology method once with expected arguments', () => {
					expect(MOCK_TECHNOLOGY_DATASOURCE.updateTechnology).toHaveBeenCalledTimes(1);
					expect(MOCK_TECHNOLOGY_DATASOURCE.updateTechnology).toHaveBeenCalledWith(
						MOCK_EXISTING_ID,
						MOCK_INPUT_UPDATE_TECHNOLOGY
					);
				});

				it('calls mapTechnology mapper function once with expected argument', () => {
					expect(MOCK_MAP_TECHNOLOGY).toHaveBeenCalledTimes(1);
					expect(MOCK_MAP_TECHNOLOGY).toHaveBeenCalledWith(MOCK_EXISTING_TECHNOLOGY_ENTITY);
				});

				it('returns expected result', () => {
					expect(response.body.kind).toEqual('single');
					assert(response.body.kind === 'single');
					expect(response.body.singleResult.errors).toBeUndefined();
					expect(response.body.singleResult.data).toEqual({
						updateTechnology: EXPECTED_RESULT_EXISTING_TECHNOLOGY,
					});
				});
			});

			describe('when called with invalid input: displayName value is null', () => {
				let response: GraphQLResponse<MutationUpdateTechnology>;

				beforeAll(async () => {
					response = await testServerExecuteOperation<MutationUpdateTechnology>(
						{
							query: MOCK_MUTATION_UPDATE_TECHNOLOGY,
							variables: {
								id: MOCK_EXISTING_ID_STRING,
								input: {
									displayName: null,
								},
							},
						},
						MOCK_CONTEXT
					);
				});

				it('returns expected error result', async () => {
					expectSingleErrorResponse(response, null, {
						message: 'Invalid argument property value. Display Name cannot be null.',
						path: ['updateTechnology'],
						extensions: {
							code: ApolloServerErrorCode.BAD_USER_INPUT,
							argumentName: 'input',
							propertyName: 'displayName',
							propertyValue: null,
						},
					});
				});
			});
		});

		describe('.deleteTechnology', () => {
			describe('when called with existing id', () => {
				let response: GraphQLResponse<MutationDeleteTechnology>;

				beforeAll(async () => {
					MOCK_TECHNOLOGY_DATASOURCE.deleteTechnology.mockResolvedValue(
						MOCK_EXISTING_TECHNOLOGY_ENTITY
					);
					response = await testServerExecuteOperation<MutationDeleteTechnology>(
						{
							query: MOCK_MUTATION_DELETE_TECHNOLOGY,
							variables: {
								id: MOCK_EXISTING_ID_STRING,
							},
						},
						MOCK_CONTEXT
					);
				});

				afterAll(() => {
					MOCK_TECHNOLOGY_DATASOURCE.deleteTechnology.mockReset();
				});

				it('calls TechnologyDataSource deleteTechnology method once with expected argument', () => {
					expect(MOCK_TECHNOLOGY_DATASOURCE.deleteTechnology).toHaveBeenCalledTimes(1);
					expect(MOCK_TECHNOLOGY_DATASOURCE.deleteTechnology).toHaveBeenCalledWith(
						MOCK_EXISTING_ID
					);
				});

				it('returns expected result', () => {
					expect(response.body.kind).toEqual('single');
					assert(response.body.kind === 'single');
					expect(response.body.singleResult.errors).toBeUndefined();
					expect(response.body.singleResult.data).toEqual({
						deleteTechnology: true,
					});
				});
			});
		});
	});
});

function expectSingleErrorResponse(
	response: GraphQLResponse,
	expectedDataObject: Record<string, unknown> | null,
	errorMatchObject: Record<string, unknown>
) {
	expect(response.body.kind).toEqual('single');
	assert(response.body.kind === 'single');
	expect(response.body.singleResult.data).toEqual(expectedDataObject);
	expect(response.body.singleResult.errors).toBeInstanceOf(Array);
	expect(response.body.singleResult.errors).toHaveLength(1);
	assert(Array.isArray(response.body.singleResult.errors));
	expect(response.body.singleResult.errors[0]).toMatchObject(errorMatchObject);
}
