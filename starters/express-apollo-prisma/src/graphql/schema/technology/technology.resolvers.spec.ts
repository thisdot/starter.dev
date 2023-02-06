import gql from 'graphql-tag';
import {
	Query,
	Mutation,
	Technology,
	CreateTechnology,
	UpdateTechnology,
} from '../generated/types';
import assert from 'assert';
import { serverExecuteOperation } from '../../utils/test';
import { createMockTechnologyDataSource } from '../../utils/test';
import { GraphQLResponse } from '@apollo/server';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { ExecuteOperationOptions } from '@apollo/server/dist/esm/externalTypes/graphql';
import { ServerContext } from '../../server-context';

import { TechnologyEntity } from '@prisma/client';
import { mapTechnology } from '../../mappers';

type QueryTechnology = Pick<Query, 'technology'>;
type QueryTechnologies = Pick<Query, 'technologies'>;
type MutationCreateTechnology = Pick<Mutation, 'createTechnology'>;
type MutationUpdateTechnology = Pick<Mutation, 'updateTechnology'>;
type MutationDeleteTechnology = Pick<Mutation, 'deleteTechnology'>;

const MOCK_EXISTING_ID = 123;
const MOCK_EXISTING_ID_STRING = String(MOCK_EXISTING_ID);
const MOCK_EXISTING_NAME = 'MOCK_EXISTING_NAME';
const MOCK_EXISTING_TECHNOLOGY_ENTITY: TechnologyEntity = {
	id: MOCK_EXISTING_ID,
	name: MOCK_EXISTING_NAME,
};
const MOCK_NON_EXISTING_ID = 321;
const MOCK_NON_EXISTING_ID_STRING = '321';
const MOCK_QUERY_TECHNOLOGY = gql`
	query TechnologyQuery($id: ID!) {
		technology(id: $id) {
			id
			name
		}
	}
`;

const MOCK_QUERY_TECHNOLOGIES = gql`
	query TechnologiesQuery {
		technologies {
			id
			name
		}
	}
`;

const MOCK_TECHNOLOGY_DATASOURCE = createMockTechnologyDataSource();
const MOCK_EXECUTE_OPERATION_OPTIONS: ExecuteOperationOptions<ServerContext> = {
	contextValue: {
		dataSources: {
			technologyDataSource: MOCK_TECHNOLOGY_DATASOURCE,
		},
		token: undefined,
	},
};

const EXPECTED_RESULT_EXISTING_TECHNOLOGY: Technology = {
	id: '123',
	name: 'MOCK_EXISTING_NAME',
};

const MOCK_MUTATION_CREATE_TECHNOLOGY = gql`
	mutation CreateTechnologyMutation($input: CreateTechnology!) {
		createTechnology(input: $input) {
			id
			name
		}
	}
`;

const MOCK_INPUT_CREATE_TECHNOLOGY: CreateTechnology = {
	name: 'MOCK_EXISTING_NAME',
};

const MOCK_MUTATION_UPDATE_TECHNOLOGY = gql`
	mutation UpdateTechnologyMutation($id: ID!, $input: UpdateTechnology!) {
		updateTechnology(id: $id, input: $input) {
			id
			name
		}
	}
`;

const MOCK_INPUT_UPDATE_TECHNOLOGY: UpdateTechnology = {
	name: 'MOCK_EXISTING_NAME',
};

const MOCK_MUTATION_DELETE_TECHNOLOGY = gql`
	mutation DeleteTechnologyMutation($id: ID!) {
		deleteTechnology(id: $id)
	}
`;

jest.mock('../../mappers/technology', () => ({
	mapTechnology: jest.fn().mockReturnValue({
		id: '123',
		name: 'MOCK_EXISTING_NAME',
	}),
}));
const MOCK_MAP_TECHNOLOGY = mapTechnology as jest.Mock<Technology, [TechnologyEntity]>;

describe('technologyResolvers', () => {
	describe('.Query', () => {
		describe('.technology', () => {
			describe('when called with existing valid id', () => {
				let response: GraphQLResponse<QueryTechnology>;

				beforeAll(async () => {
					MOCK_TECHNOLOGY_DATASOURCE.getTechnologyById.mockResolvedValue(
						MOCK_EXISTING_TECHNOLOGY_ENTITY
					);
					response = await serverExecuteOperation<QueryTechnology>(
						{
							query: MOCK_QUERY_TECHNOLOGY,
							variables: {
								id: MOCK_EXISTING_ID_STRING,
							},
						},
						MOCK_EXECUTE_OPERATION_OPTIONS
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
					response = await serverExecuteOperation<QueryTechnology>(
						{
							query: MOCK_QUERY_TECHNOLOGY,
							variables: {
								id: MOCK_NON_EXISTING_ID_STRING,
							},
						},
						MOCK_EXECUTE_OPERATION_OPTIONS
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
					expect(response.body.kind).toEqual('single');
					assert(response.body.kind === 'single');
					expect(response.body.singleResult.data).toEqual({
						technology: null,
					});
					expect(response.body.singleResult.errors).toBeInstanceOf(Array);
					expect(response.body.singleResult.errors).toHaveLength(1);
					assert(Array.isArray(response.body.singleResult.errors));
					expect(response.body.singleResult.errors[0]).toMatchObject({
						message: 'Technology not found.',
						path: ['technology'],
						extensions: { code: ApolloServerErrorCode.PERSISTED_QUERY_NOT_FOUND },
					});
				});
			});

			describe('when called with invalid id', () => {
				let response: GraphQLResponse<QueryTechnology>;

				beforeAll(async () => {
					response = await serverExecuteOperation<QueryTechnology>(
						{
							query: MOCK_QUERY_TECHNOLOGY,
							variables: {
								id: 'INVALID_NUMBER_ID',
							},
						},
						MOCK_EXECUTE_OPERATION_OPTIONS
					);
				});

				afterAll(() => {
					MOCK_TECHNOLOGY_DATASOURCE.getTechnologyById.mockClear();
					MOCK_MAP_TECHNOLOGY.mockClear();
				});

				it('returns expected error result', async () => {
					expect(response.body.kind).toEqual('single');
					assert(response.body.kind === 'single');
					expect(response.body.singleResult.data).toEqual({
						technology: null,
					});
					expect(response.body.singleResult.errors).toBeInstanceOf(Array);
					expect(response.body.singleResult.errors).toHaveLength(1);
					assert(Array.isArray(response.body.singleResult.errors));
					expect(response.body.singleResult.errors[0]).toMatchObject({
						message: 'Invalid argument value',
						path: ['technology'],
						extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT, argumentName: 'id' },
					});
				});
			});
		});

		describe('.technologies', () => {
			describe('when called', () => {
				let response: GraphQLResponse<QueryTechnologies>;
				const MOCK_RESULT_TECHNOLOGY_ENTITY_ARRAY = [MOCK_EXISTING_TECHNOLOGY_ENTITY];

				beforeAll(async () => {
					MOCK_TECHNOLOGY_DATASOURCE.getTechnologies.mockResolvedValue(
						MOCK_RESULT_TECHNOLOGY_ENTITY_ARRAY
					);
					response = await serverExecuteOperation<QueryTechnologies>(
						{
							query: MOCK_QUERY_TECHNOLOGIES,
						},
						MOCK_EXECUTE_OPERATION_OPTIONS
					);
				});

				afterAll(() => {
					MOCK_TECHNOLOGY_DATASOURCE.getTechnologies.mockReset();
					MOCK_MAP_TECHNOLOGY.mockClear();
				});

				it('calls TechnologyDataSource getTechnologies method once', () => {
					expect(MOCK_TECHNOLOGY_DATASOURCE.getTechnologies).toHaveBeenCalledTimes(1);
				});

				it('calls mapTechnology mapper function for each technology entity', () => {
					expect(MOCK_MAP_TECHNOLOGY).toHaveBeenCalledTimes(
						MOCK_RESULT_TECHNOLOGY_ENTITY_ARRAY.length
					);
					expect(MOCK_MAP_TECHNOLOGY.mock.calls[0][0]).toEqual(MOCK_EXISTING_TECHNOLOGY_ENTITY);
				});

				it('returns expected result', async () => {
					expect(response.body.kind).toEqual('single');
					assert(response.body.kind === 'single');
					expect(response.body.singleResult.errors).toBeUndefined();
					expect(response.body.singleResult.data).toEqual({
						technologies: [EXPECTED_RESULT_EXISTING_TECHNOLOGY],
					});
				});
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
					response = await serverExecuteOperation<MutationCreateTechnology>(
						{
							query: MOCK_MUTATION_CREATE_TECHNOLOGY,
							variables: {
								input: MOCK_INPUT_CREATE_TECHNOLOGY,
							},
						},
						MOCK_EXECUTE_OPERATION_OPTIONS
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
					response = await serverExecuteOperation<MutationUpdateTechnology>(
						{
							query: MOCK_MUTATION_UPDATE_TECHNOLOGY,
							variables: {
								id: MOCK_EXISTING_ID_STRING,
								input: MOCK_INPUT_UPDATE_TECHNOLOGY,
							},
						},
						MOCK_EXECUTE_OPERATION_OPTIONS
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

			describe('when called with invalid input: name value is null', () => {
				let response: GraphQLResponse<MutationUpdateTechnology>;

				beforeAll(async () => {
					response = await serverExecuteOperation<MutationUpdateTechnology>(
						{
							query: MOCK_MUTATION_UPDATE_TECHNOLOGY,
							variables: {
								id: MOCK_EXISTING_ID_STRING,
								input: {
									name: null,
								},
							},
						},
						MOCK_EXECUTE_OPERATION_OPTIONS
					);
				});

				it('returns expected error result', async () => {
					expect(response.body.kind).toEqual('single');
					assert(response.body.kind === 'single');
					expect(response.body.singleResult.data).toEqual(null);
					expect(response.body.singleResult.errors).toBeInstanceOf(Array);
					expect(response.body.singleResult.errors).toHaveLength(1);
					assert(Array.isArray(response.body.singleResult.errors));
					expect(response.body.singleResult.errors[0]).toMatchObject({
						message: 'Invalid argument property value. Name cannot be null.',
						path: ['updateTechnology'],
						extensions: {
							code: ApolloServerErrorCode.BAD_USER_INPUT,
							argumentName: 'input',
							propertyName: 'name',
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
					response = await serverExecuteOperation<MutationDeleteTechnology>(
						{
							query: MOCK_MUTATION_DELETE_TECHNOLOGY,
							variables: {
								id: MOCK_EXISTING_ID_STRING,
							},
						},
						MOCK_EXECUTE_OPERATION_OPTIONS
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
