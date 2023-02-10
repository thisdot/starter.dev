import { QueryOptions } from 'contentful-management';
import { CONTENTFUL_CONTENT_TYPE_ID_TECHNOLOGY } from './constants';
import { getEnvironment } from './get-environment';

export const CONTENTFUL_HEALTH_CHECK_QUERY_OPTIONS: QueryOptions = {
	content_type: CONTENTFUL_CONTENT_TYPE_ID_TECHNOLOGY,
	limit: 1,
	include: 0,
};

export const checkHealth = async (): Promise<boolean> => {
	let healthy: boolean;
	try {
		const environment = await getEnvironment();
		const { items } = await environment.getEntries(
			CONTENTFUL_HEALTH_CHECK_QUERY_OPTIONS
		);
		healthy = Array.isArray(items);
	} catch {
		healthy = false;
	}
	return healthy;
};
