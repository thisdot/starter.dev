import { Request, RequestHandler, Response } from 'express';
import { RedisClient } from '../cache/redis';
import { HealthCheckResult } from './healthcheck-result';
import { PrismaClient } from '@prisma/client';
import { getRedisHealth } from './redis-healthcheck';
import { getDataSourceHealth } from './datasource-healthcheck';

export type CreateHealthcheckHandlerOptions = {
	redisClient?: RedisClient;
	prismaClient?: PrismaClient;
};

export const createHealthcheckHandler = (
	options: CreateHealthcheckHandlerOptions
): RequestHandler => {
	return async (req: Request, res: Response) => {
		const result: HealthCheckResult = {
			cacheDatabase: await getRedisHealth(options.redisClient),
			dataSource: await getDataSourceHealth(options.prismaClient),
		};

		const hasFailedCheck = Object.values(result).includes(false);
		const statusCode = hasFailedCheck ? 503 : 200;

		res.status(statusCode).send(result);
	};
};
