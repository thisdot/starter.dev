import { APIGatewayProxyHandler } from 'aws-lambda';
import { getContentfulHealth } from '../utils/contentful';
import { getRedisHealth } from '../utils/redis';

export type HealthCheckResult = {
	cacheDatabase: boolean;
	contentful: boolean;
};

export const handler: APIGatewayProxyHandler = async () => {
	const result: HealthCheckResult = {
		cacheDatabase: await getRedisHealth(),
		contentful: await getContentfulHealth(),
	};

	const hasFailedCheck = Object.values(result).includes(false);
	const statusCode = hasFailedCheck ? 503 : 200;

	return {
		statusCode: statusCode,
		body: JSON.stringify(result),
		headers: {
			'Content-Type': 'application/json',
		},
	};
};
