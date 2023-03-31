import { mapTechnology, mapTechnologyCollection } from './technology';
import { TechnologyEntity } from '@prisma/client';
import { Technology, TechnologyCollection } from '../schema/generated/types';
import { createMockTechnologyEntityCollection } from '../../mocks/technology-entity';
import { createMockTechnologyCollectionResult } from '../../mocks/technology';
import { PageInformation } from '../data-sources';

jest.mock('./technology', () => {
	const originalModule = jest.requireActual<typeof import('./technology')>('./technology');

	return {
		__esModule: true, // Use it when dealing with esModules
		...originalModule,
		mapTechnology: jest.spyOn(originalModule, 'mapTechnology'),
	};
});

describe('.mapTechnology', () => {
	describe('when called', () => {
		it('returns expected result', () => {
			const MOCK_TECHNOLOGY: TechnologyEntity = {
				id: 123,
				displayName: 'MOCK_TECHNOLOGY',
				description: 'MOCK_TECHNOLOGY_DESCRIPTION',
				url: 'MOCK_TECHNOLOGY_URL',
			};
			const EXPECTED_RESULT: Technology = {
				__typename: 'Technology',
				id: '123',
				displayName: 'MOCK_TECHNOLOGY',
				description: 'MOCK_TECHNOLOGY_DESCRIPTION',
				url: 'MOCK_TECHNOLOGY_URL',
			};

			const result = mapTechnology(MOCK_TECHNOLOGY);

			expect(result).toEqual(EXPECTED_RESULT);
		});
	});
});

describe('.mapTechnologyCollection', () => {
	describe('when called with arguments', () => {
		const MOCK_TOTAL_COUNT = 11;
		const MOCK_FIRST_INPUT = 3;
		const MOCK_PAGE_INFO: PageInformation = {
			hasNextPage: true,
			hasPreviousPage: false,
			startCursor: 1,
			endCursor: 3,
		};

		const MOCK_TECHNOLOGY_ENTITY_COLLECTION_PAGE = createMockTechnologyEntityCollection(
			MOCK_FIRST_INPUT,
			MOCK_TOTAL_COUNT,
			MOCK_PAGE_INFO
		);

		const EXPECTED_RESULT = createMockTechnologyCollectionResult(
			MOCK_TOTAL_COUNT,
			MOCK_FIRST_INPUT,
			MOCK_PAGE_INFO
		);

		let result: TechnologyCollection;

		beforeAll(() => {
			result = mapTechnologyCollection(MOCK_TECHNOLOGY_ENTITY_COLLECTION_PAGE);
		});

		it('returns expected result', () => {
			expect(result).toEqual(EXPECTED_RESULT);
		});
	});
});
