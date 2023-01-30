import type { APIGatewayProxyHandler } from 'aws-lambda';
import Redis from 'ioredis';
import { StatusCodes } from 'http-status-codes';
import { listTables } from '@/utils/dynamodb/listTables';
import { listQueues } from '@/utils/sqs/listQueues';
import { getClient as getRedisClient } from '@/utils/redis/getClient';
import { getErrorMessage } from '@/utils/error/getErrorMessage';

const checkRedisConnection = (client: Redis) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(client.status);
		}, 100);
	});
};

export const handler: APIGatewayProxyHandler = async () => {
	try {
		const [dynamodbTables, sqsQueues, cacheRedisConnected] = await Promise.all([
			listTables(),
			listQueues(),
			checkRedisConnection(await getRedisClient('cache', process.env.REDIS_CACHE_URL)),
		]);

		return {
			statusCode: StatusCodes.OK,
			body: JSON.stringify({
				dynamodbStatus: `Connected with tables: ${dynamodbTables}`,
				sqsStatus: `Connected with queues: ${sqsQueues}`,
				cacheRedisStatus: cacheRedisConnected,
			}),
		};
	} catch (err) {
		return {
			statusCode: StatusCodes.SERVICE_UNAVAILABLE,
			body: getErrorMessage(err),
		};
	}
};
