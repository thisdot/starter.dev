import { technologyResolvers } from './technology.resolvers';
import { TechnologyModel } from '../../models/TechnologyModel';
import assert from 'assert';
import {
	Maybe,
	ResolversParentTypes,
	ResolverTypeWrapper,
	Technology,
} from '../../generated/graphql';
import { BaseContext } from '@apollo/server';
import { GraphQLResolveInfo } from 'graphql';
import { mockEntry, mockGraphQLResolveInfo } from '../../utils/test/mocks';


jest.mock('../../models/TechnologyModel', () => ({
	TechnologyModel: {
		getAll: jest.fn(),
		get: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		test: 'YE'
	},
}));

type TechnologyModelStaticPartial = Pick<
	typeof TechnologyModel,
	Exclude<keyof typeof TechnologyModel, 'prototype'>
>;
type TechnologyModelStaticPartialMock = {
	[K in keyof TechnologyModelStaticPartial]: jest.MockedFn<
		TechnologyModelStaticPartial[K]
	>;
};

const MOCK_TECHNOLOGY_MODEL_STATIC =
	TechnologyModel as unknown as TechnologyModelStaticPartialMock;

const MOCK_PARENT_QUERY: ResolversParentTypes['Query'] = {};
const MOCK_CONTEXT: BaseContext = {};
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

					const EXPECTED_RESULT = [
						{
							description: 'MOCK_DESCRIPTION_1',
							displayName: 'MOCK_DISPLAY_NAME_1',
							id: 'MOCK_ID_1',
							url: 'MOCK_URL_1',
						},
					];

					let result: Maybe<Maybe<ResolverTypeWrapper<Technology>>[]>;

					beforeAll(async () => {
						MOCK_TECHNOLOGY_MODEL_STATIC.get.mockResolvedValue(MOCK_ENTRY_1);
						result = await RESOLVER_FN(
							MOCK_PARENT_QUERY,
							{ id: MOCK_REQUESTED_ID },
							MOCK_CONTEXT,
							MOCK_RESOLVE_INFO
						);
					});

					afterAll(() => {
						MOCK_TECHNOLOGY_MODEL_STATIC.get.mockReset();
					});

					it('calls TechnologyModel.get method once with expected argument', () => {
						expect(MOCK_TECHNOLOGY_MODEL_STATIC.get).toHaveBeenCalledTimes(1);
						expect(MOCK_TECHNOLOGY_MODEL_STATIC.get).toHaveBeenCalledWith(
							MOCK_REQUESTED_ID
						);
					});

					it('returns expected result', () => {
						expect(result).toBeInstanceOf(Array);
						expect(result).toHaveLength(1);

						expect(result).toEqual(EXPECTED_RESULT);
					});
				});

				//TODO: fix implementation
				// describe('and id does not exist', () => {

				// })
			});

			describe('when called without id', () => {
				describe('and items found: ', () => {
					const EXPECTED_RESULT = [
						{
							description: 'MOCK_DESCRIPTION_1',
							displayName: 'MOCK_DISPLAY_NAME_1',
							id: 'MOCK_ID_1',
							url: 'MOCK_URL_1',
						},
						{
							description: 'MOCK_DESCRIPTION_2',
							displayName: 'MOCK_DISPLAY_NAME_2',
							id: 'MOCK_ID_2',
							url: 'MOCK_URL_2',
						},
					];

					let result: Maybe<Maybe<ResolverTypeWrapper<Technology>>[]>;

					beforeAll(async () => {
						const MOCK_RETURN = [
							MOCK_ENTRY_1,
							MOCK_ENTRY_2
						]
						MOCK_TECHNOLOGY_MODEL_STATIC.getAll.mockResolvedValue(MOCK_RETURN);
						result = await RESOLVER_FN(
							MOCK_PARENT_QUERY,
							{},
							MOCK_CONTEXT,
							MOCK_RESOLVE_INFO
						);
					});

					afterAll(() => {
						MOCK_TECHNOLOGY_MODEL_STATIC.getAll.mockReset();
					});

					it('calls TechnologyModel.getAll method once', () => {
						expect(MOCK_TECHNOLOGY_MODEL_STATIC.getAll).toHaveBeenCalledTimes(1);
					});

					it('returns expected result', () => {
						expect(result).toBeInstanceOf(Array);
						expect(result).toHaveLength(EXPECTED_RESULT.length);
						expect(result).toEqual(EXPECTED_RESULT);
					});
				});
			});
		});
	});
});
