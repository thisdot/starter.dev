import { RequestHandler } from 'express';
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
): RequestHandler<Record<string, never>, HealthCheckResult> => {
	return async (req, res) => {
		const result: HealthCheckResult = {
			cacheDatabase: await getRedisHealth(options.redisClient),
			dataSource: await getDataSourceHealth(options.prismaClient),
		};

		const hasFailedCheck = Object.values(result).includes(false);
		const statusCode = hasFailedCheck ? 500 : 200;

		res.status(statusCode).send(result);
	};
};
