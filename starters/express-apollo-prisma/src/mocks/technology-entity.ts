import { TechnologyEntity } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { TechnologyDataSource, TechnologyEntityCollection } from '../graphql/data-sources';

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

export const createMockTechnologyEntityCollection = (
	edgesCount: number,
	totalCount: number
): TechnologyEntityCollection => ({
	totalCount,
	edges: Array(edgesCount).fill(null).map(createMockTechnologyEntity),
});
