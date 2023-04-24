import { TechnologyEntity } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import {
	PageInformation,
	TechnologyDataSource,
	TechnologyEntityCollection,
	TechnologyEdge,
} from '../graphql/data-sources';

export const createMockTechnologyDataSource = (): DeepMockProxy<TechnologyDataSource> =>
	mockDeep<TechnologyDataSource>();

let technologyEntityIdCount = 1;
let alternateTechnologyEntityIdCount = 1;

const createMockTechnologyEntity = (idCount?: number): TechnologyEntity => {
	const id = idCount ? idCount++ : technologyEntityIdCount++;
	return {
		description: `MOCK_DESCRIPTION_${id}`,
		displayName: `MOCK_DISPLAY_NAME_${id}`,
		id,
		url: `MOCK_URL_${id}`,
	};
};

export const createMockTechnologyEntityCollection = (
	edgesCount: number,
	totalCount: number,
	pageInfo: PageInformation
): TechnologyEntityCollection => ({
	totalCount,
	pageInfo,
	edges: Array(edgesCount)
		.fill(null)
		.map(() => {
			const technology = createMockTechnologyEntity();
			return {
				node: technology,
				cursor: technology.id,
			};
		}),
});

export const createMockTechnologyEntities = (totalCount: number): TechnologyEntity[] => {
	return Array(totalCount).fill(null).map(createMockTechnologyEntity);
};

export const createMockTechnologyEdges = (totalCount: number): TechnologyEdge[] => {
	return Array(totalCount)
		.fill(null)
		.map(() => {
			const technology = createMockTechnologyEntity(alternateTechnologyEntityIdCount++);
			return {
				node: technology,
				cursor: technology.id,
			};
		});
};
