import { Technology } from '../endpoints/graphql/schema/generated/types';

let technologyIdCount = 0;
export const createMockTechnology = (): Technology => {
	const id = `MOCK_ID_${technologyIdCount++}`;
	return {
		description: `MOCK_DESCRIPTION_${id}`,
		displayName: `MOCK_DISPLAY_NAME_${id}`,
		id,
		url: `MOCK_URL_${id}`,
	};
};
