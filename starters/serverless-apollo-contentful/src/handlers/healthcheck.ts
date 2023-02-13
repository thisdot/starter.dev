import { APIGatewayProxyHandler } from 'aws-lambda';
import { getEnvironment } from '../utils/contentful';
import { redisClient } from '../utils/redis';

type HealthCheckResult = {
	cacheDatabase: boolean;
	contentful: boolean;
};

export const handler: APIGatewayProxyHandler = async () => {
	let cacheDatabase: boolean;
	let contentful: boolean;
	try {
		await redisClient.get('');
		cacheDatabase = true;
	} catch {
		cacheDatabase = false;
	}

	try {
		await getEnvironment();
		contentful = true;
	} catch {
		contentful = false;
	}

	const result: HealthCheckResult = {
		cacheDatabase,
		contentful,
	};

	const hasFailedCheck = Object.values(result).includes(false);
	const statusCode = hasFailedCheck ? 503 : 200;

	return {
		statusCode: statusCode,
		body: JSON.stringify({ cacheDatabase }),
		headers: {
			'Content-Type': 'application/json',
		},
	};
};
