import { APIGatewayProxyHandler } from 'aws-lambda';
import { redisClient } from '../utils/redis';

export const handler: APIGatewayProxyHandler = async () => {
	await redisClient.get(''); // should throw if not connected

	return {
		statusCode: 200,
		body: 'Okay!',
	};
};
