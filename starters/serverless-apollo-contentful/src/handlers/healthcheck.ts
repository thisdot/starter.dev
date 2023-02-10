import { APIGatewayProxyHandler } from 'aws-lambda';
import { checkHealth } from '../utils/contentful';
import { redisClient } from '../utils/redis';

type HealthCheckResult = {
	cacheDatabase: boolean;
	dataSource: boolean;
};

export const handler: APIGatewayProxyHandler = async () => {
	let cacheDatabase: boolean;
	try {
		await redisClient.get('');
		cacheDatabase = true;
	} catch {
		cacheDatabase = false;
	}

	const dataSource = await checkHealth();

	const result: HealthCheckResult = {
		cacheDatabase,
		dataSource,
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
