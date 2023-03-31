import { PageInformation } from '../graphql/data-sources';
import { Technology, TechnologyCollection } from '../graphql/schema/generated/types';

let technologyIdCount = 1;
export const createMockTechnology = (): Technology => {
	const id = `${technologyIdCount++}`;
	return {
		__typename: 'Technology',
		description: `MOCK_DESCRIPTION_${id}`,
		displayName: `MOCK_DISPLAY_NAME_${id}`,
		id,
		url: `MOCK_URL_${id}`,
	};
};

export const createMockTechnologyCollectionResult = (
	totalCount: number,
	first: number,
	pageInfo: PageInformation
): TechnologyCollection => {
	return {
		totalCount: totalCount,
		pageInfo,
		edges: Array(first)
			.fill(null)
			.map(() => {
				const MOCK_TECHNOLOGY = createMockTechnology();
				return {
					__typename: 'TechnologyNode',
					node: MOCK_TECHNOLOGY,
					cursor: Number(MOCK_TECHNOLOGY.id),
				};
			}),
	};
};
