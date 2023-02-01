import { APIGatewayProxyHandler } from 'aws-lambda';
import { redisClient } from '../utils/redis';

export const handler: APIGatewayProxyHandler = async () => {
	let cacheDatabase: boolean;
	try {
		await redisClient.get('');
		cacheDatabase = true;
	} catch {
		cacheDatabase = false;
	}

	return {
		statusCode: cacheDatabase ? 200 : 500,
		body: JSON.stringify({ cacheDatabase }),
		headers: {
			'Content-Type': 'application/json',
		},
	};
};
