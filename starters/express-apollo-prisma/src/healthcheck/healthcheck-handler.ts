import { RequestHandler } from 'express';
import { RedisClient } from '../cache/redis';
import { HealthCheckResult } from './healthcheck-result';
import { PrismaClient, Prisma } from '@prisma/client';

type CreateHealthcheckHandlerOptions = {
	redisClient?: RedisClient;
	prismaClient?: PrismaClient;
};

export const createHealthcheckHandler = (
	options: CreateHealthcheckHandlerOptions
): RequestHandler<Record<string, never>, HealthCheckResult> => {
	return async (req, res) => {
		let responseStatus = 200;
		let cacheDatabase: boolean;
		try {
			const redisClientPingResult = await options.redisClient?.ping();
			cacheDatabase = redisClientPingResult === 'PONG';
		} catch {
			cacheDatabase = false;
			responseStatus = 500;
		}

		let dataSource: boolean;
		try {
			const prismaClientPingResult = await options.prismaClient?.$queryRaw<[{ 1: bigint }]>(
				Prisma.sql(['SELECT 1'])
			);
			dataSource = Number(prismaClientPingResult?.[0][1]) === 1;
		} catch {
			dataSource = false;
			responseStatus = 500;
		}

		res.status(responseStatus).send({
			cacheDatabase,
			dataSource,
		});
	};
};
