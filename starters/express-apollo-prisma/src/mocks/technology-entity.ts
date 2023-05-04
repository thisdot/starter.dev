import { TechnologyEntity } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import {
	TechnologyDataSource,
	TechnologyEntityCollectionPage,
} from '../endpoints/graphql/data-sources';

export const createMockTechnologyDataSource = (): DeepMockProxy<TechnologyDataSource> =>
	mockDeep<TechnologyDataSource>();

let technologyEntityIdCount = 0;

const createMockTechnologyEntity = (): TechnologyEntity => {
	const id = technologyEntityIdCount++;
	return {
		description: `MOCK_DESCRIPTION_${id}`,
		displayName: `MOCK_DISPLAY_NAME_${id}`,
		id,
		url: `MOCK_URL_${id}`,
	};
};

export const createMockTechnologyEntityCollectionPage = (
	itemsCount: number,
	totalCount: number
): TechnologyEntityCollectionPage => ({
	totalCount,
	items: Array(itemsCount).fill(null).map(createMockTechnologyEntity),
});
