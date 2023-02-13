import { APIGatewayProxyHandler } from 'aws-lambda';
import { getContentfulHealth } from '../utils/contentful';
import { redisClient } from '../utils/redis';

export type HealthCheckResult = {
	cacheDatabase: boolean;
	contentful: boolean;
};

export const handler: APIGatewayProxyHandler = async () => {
	let cacheDatabase: boolean;
	try {
		await redisClient.get('');
		cacheDatabase = true;
	} catch {
		cacheDatabase = false;
	}

	const result: HealthCheckResult = {
		cacheDatabase,
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
