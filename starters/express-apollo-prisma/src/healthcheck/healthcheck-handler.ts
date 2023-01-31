import { RequestHandler } from 'express';
import { RedisClient } from '../redis';
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
		let cacheDatabase: boolean;
		try {
			const redisClientPingResult = await options.redisClient?.ping();
			cacheDatabase = redisClientPingResult === 'PONG';
		} catch {
			cacheDatabase = false;
		}

		let dataSource: boolean;
		try {
			const prismaClientPingResult = await options.prismaClient?.$queryRaw<[{ 1: bigint }]>(
				Prisma.sql(['SELECT 1'])
			);
			dataSource = Number(prismaClientPingResult?.[0][1]) === 1;
		} catch {
			dataSource = false;
		}

		res.send({
			cacheDatabase,
			dataSource,
		});
	};
};
