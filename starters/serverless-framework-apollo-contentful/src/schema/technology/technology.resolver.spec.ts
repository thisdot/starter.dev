import { technologyResolvers } from './technology.resolvers';
import { create, getAll, getById } from '../../models/Technology';
import TechnologyModel from '../../models/Technology/TechnologyModel';
import assert from 'assert';
import {
	Maybe,
	MutationCreateTechnologyArgs,
	MutationUpdateTechnologyArgs,
	RequireFields,
	ResolversParentTypes,
	ResolverTypeWrapper,
	Technology,
} from '../../generated/graphql';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';
import { mockEntry, mockGraphQLResolveInfo } from '../../utils/test/mocks';
import { MyContext } from '../../handlers/graphql';

jest.mock('../../models/Technology', () => ({
	getById: jest.fn(),
	getAll: jest.fn(),
	create: jest.fn(),
}));
const MOCK_GET_BY_ID = getById as unknown as jest.MockedFn<typeof getById>;
const MOCK_GET_ALL = getAll as unknown as jest.MockedFn<typeof getAll>;
const MOCK_CREATE = create as unknown as jest.MockedFn<typeof create>;

const MOCK_PARENT_QUERY: ResolversParentTypes['Query'] = {};
const MOCK_PARENT_MUTATION: ResolversParentTypes['Mutation'] = {};

const MOCK_CONTEXT: MyContext = { dataSources: { technologies: [] } };
const MOCK_RESOLVE_INFO: GraphQLResolveInfo = mockGraphQLResolveInfo();

const MOCK_ENTRY_1 = mockEntry('MOCK_ID_1', {
	description: {
		'en-US': 'MOCK_DESCRIPTION_1',
	},
	displayName: {
		'en-US': 'MOCK_DISPLAY_NAME_1',
	},
	url: {
		'en-US': 'MOCK_URL_1',
	},
});
const MOCK_TECHNOLOGY_1 = new TechnologyModel(MOCK_ENTRY_1);
const MOCK_TECHNOLOGY_1_UPDATE_MOCK = jest
	.spyOn(MOCK_TECHNOLOGY_1, 'update')
	.mockImplementation(async () => undefined);
const MOCK_TECHNOLOGY_1_DELETE_MOCK = jest
	.spyOn(MOCK_TECHNOLOGY_1, 'delete')
	.mockImplementation(async () => undefined);

const MOCK_ENTRY_2 = mockEntry('MOCK_ID_2', {
	description: {
		'en-US': 'MOCK_DESCRIPTION_2',
	},
	displayName: {
		'en-US': 'MOCK_DISPLAY_NAME_2',
	},
	url: {
		'en-US': 'MOCK_URL_2',
	},
});
const MOCK_TECHNOLOGY_2 = new TechnologyModel(MOCK_ENTRY_2);

describe('technologyResolvers', () => {
	describe('.Query', () => {
		describe('.technology', () => {
			assert(technologyResolvers.Query?.technology instanceof Function);
			const RESOLVER_FN = technologyResolvers.Query?.technology;

			it('has correct implementation', () => {
				expect(RESOLVER_FN).toBeDefined();
				expect(RESOLVER_FN).toBeInstanceOf(Function);
			});

			describe('when called with id', () => {
				describe('and id exists', () => {
					const MOCK_REQUESTED_ID = 'MOCK_REQUESTED_ID';

					let result: Technology | null;

					beforeAll(async () => {
						MOCK_GET_BY_ID.mockResolvedValue(MOCK_TECHNOLOGY_1);
						result = await RESOLVER_FN(
							MOCK_PARENT_QUERY,
							{ id: MOCK_REQUESTED_ID },
							MOCK_CONTEXT,
							MOCK_RESOLVE_INFO
						);
					});

					afterAll(() => {
						MOCK_GET_BY_ID.mockReset();
					});

					it('calls TechnologyModel.get method once with expected argument', () => {
						expect(getById).toHaveBeenCalledTimes(1);
						expect(getById).toHaveBeenCalledWith(MOCK_REQUESTED_ID);
					});

					it('returns expected result', () => {
						expect(result).toEqual(MOCK_TECHNOLOGY_1);
					});
				});
			});
		});

		describe('.technologies', () => {
			assert(technologyResolvers.Query?.technologies instanceof Function);
			const RESOLVER_FN = technologyResolvers.Query?.technologies;
			describe('when called without id', () => {
				describe('and items found: ', () => {
					let result: Maybe<Maybe<ResolverTypeWrapper<Technology>>[]>;
					const MOCK_RETURN = [MOCK_TECHNOLOGY_1, MOCK_TECHNOLOGY_2];

					beforeAll(async () => {
						MOCK_GET_ALL.mockResolvedValue(MOCK_RETURN);
						result = await RESOLVER_FN(MOCK_PARENT_QUERY, {}, MOCK_CONTEXT, MOCK_RESOLVE_INFO);
					});

					afterAll(() => {
						MOCK_GET_ALL.mockReset();
					});

					it('calls TechnologyModel.getAll method once', () => {
						expect(MOCK_GET_ALL).toHaveBeenCalledTimes(1);
					});

					it('returns expected result', () => {
						expect(result).toBeInstanceOf(Array);
						expect(result).toHaveLength(MOCK_RETURN.length);
						expect(result).toEqual(MOCK_RETURN);
					});
				});
			});
		});
	});

	describe('.Mutation', () => {
		describe('.createTechnology', () => {
			assert(technologyResolvers.Mutation?.createTechnology instanceof Function);
			const RESOLVER_FN = technologyResolvers.Mutation?.createTechnology;

			it('has correct implementation', () => {
				expect(RESOLVER_FN).toBeDefined();
				expect(RESOLVER_FN).toBeInstanceOf(Function);
			});

			describe('when called', () => {
				const MOCK_CREATE_TECHNOLOGY_ARGS: RequireFields<
					MutationCreateTechnologyArgs,
					'displayName'
				> = {
					displayName: 'MOCK_DISPLAY_NAME',
					description: 'MOCK_DESCRIPTION',
					url: 'MOCK_URL',
				};

				let result: Technology | null;

				beforeAll(async () => {
					MOCK_CREATE.mockResolvedValue(MOCK_TECHNOLOGY_1);
					result = await RESOLVER_FN(
						MOCK_PARENT_MUTATION,
						MOCK_CREATE_TECHNOLOGY_ARGS,
						MOCK_CONTEXT,
						MOCK_RESOLVE_INFO
					);
				});
				afterAll(() => {
					MOCK_CREATE.mockReset();
				});

				it('calls TechnologyModel.create method once with expected argument', () => {
					expect(MOCK_CREATE).toHaveBeenCalledTimes(1);
					expect(MOCK_CREATE).toHaveBeenCalledWith(MOCK_CREATE_TECHNOLOGY_ARGS);
				});

				it('returns expected result', () => {
					expect(result).toEqual(MOCK_TECHNOLOGY_1);
				});
			});
		});

		describe('.updateTechnology', () => {
			assert(technologyResolvers.Mutation?.updateTechnology instanceof Function);
			const RESOLVER_FN = technologyResolvers.Mutation?.updateTechnology;

			it('has correct implementation', () => {
				expect(RESOLVER_FN).toBeDefined();
				expect(RESOLVER_FN).toBeInstanceOf(Function);
			});

			describe('when called', () => {
				const MOCK_UPDATED_FIELDS = {
					description: 'MOCK_DESCRIPTION',
					url: 'MOCK_URL',
				};
				const MOCK_ID_ARG = 'MOCK_ID';
				const MOCK_UPDATE_TECHNOLOGY_ARGS: RequireFields<MutationUpdateTechnologyArgs, 'id'> = {
					id: MOCK_ID_ARG,
					fields: MOCK_UPDATED_FIELDS,
				};

				let result: Technology | null;

				describe('with fields', () => {
					beforeAll(async () => {
						MOCK_GET_BY_ID.mockResolvedValue(MOCK_TECHNOLOGY_1);
						await RESOLVER_FN(
							MOCK_PARENT_MUTATION,
							MOCK_UPDATE_TECHNOLOGY_ARGS,
							MOCK_CONTEXT,
							MOCK_RESOLVE_INFO
						);
					});
					afterAll(() => {
						MOCK_GET_BY_ID.mockReset();
						MOCK_TECHNOLOGY_1_UPDATE_MOCK.mockReset();
					});

					it('calls TechnologyModel.update method once with expected argument', () => {
						expect(MOCK_TECHNOLOGY_1_UPDATE_MOCK).toHaveBeenCalledTimes(1);
						expect(MOCK_TECHNOLOGY_1_UPDATE_MOCK).toHaveBeenCalledWith(MOCK_UPDATED_FIELDS);
					});
				});

				describe('without fields', () => {
					beforeAll(async () => {
						MOCK_GET_BY_ID.mockResolvedValue(MOCK_TECHNOLOGY_1);

						result = await RESOLVER_FN(
							MOCK_PARENT_MUTATION,
							{ id: MOCK_ID_ARG },
							MOCK_CONTEXT,
							MOCK_RESOLVE_INFO
						);
					});
					afterAll(() => {
						MOCK_GET_BY_ID.mockReset();
						MOCK_TECHNOLOGY_1_UPDATE_MOCK.mockReset();
					});

					it('returns the existing model without mutation', () => {
						expect(result).toEqual(MOCK_TECHNOLOGY_1);
					});
				});

				describe('with a displayName null', () => {
					beforeAll(() => {
						MOCK_GET_BY_ID.mockResolvedValue(MOCK_TECHNOLOGY_1);
					});
					afterAll(() => {
						MOCK_GET_BY_ID.mockReset();
					});

					it('throws an error', async () => {
						await expect(
							RESOLVER_FN(
								MOCK_PARENT_MUTATION,
								{ id: 'MOCK_ID', fields: { displayName: null } },
								MOCK_CONTEXT,
								MOCK_RESOLVE_INFO
							)
						).rejects.toThrow(GraphQLError);
					});
				});
			});
		});

		describe('.deleteTechnology', () => {
			assert(technologyResolvers.Mutation?.deleteTechnology instanceof Function);
			const RESOLVER_FN = technologyResolvers.Mutation?.deleteTechnology;
			let result: string | null;

			describe('when called', () => {
				beforeAll(async () => {
					MOCK_GET_BY_ID.mockResolvedValue(MOCK_TECHNOLOGY_1);
					result = await RESOLVER_FN(
						MOCK_PARENT_MUTATION,
						{ id: 'MOCK_ID' },
						MOCK_CONTEXT,
						MOCK_RESOLVE_INFO
					);
				});
				afterAll(() => {
					MOCK_GET_BY_ID.mockReset();
					MOCK_TECHNOLOGY_1_DELETE_MOCK.mockReset();
				});

				it('deletes the model', () => {
					expect(MOCK_TECHNOLOGY_1_DELETE_MOCK).toHaveBeenCalledTimes(1);
				});

				it('returns the id', () => {
					expect(result).toBe('MOCK_ID');
				});
			});
		});
	});
});
