import { ServerContext } from './server-context';
import { ExpressMiddlewareOptions } from '@apollo/server/express4';
import { WithRequired } from '@apollo/utils.withrequired';
import { TechnologyDataSource } from '../data-sources';
import { PrismaClient } from '@prisma/client';
import { RedisClient } from '../../redis';

const prismaClient = new PrismaClient();

export const createServerContextMiddlewareOptions = (
	redisClient?: RedisClient,
	redisCacheTtlSeconds?: number
): WithRequired<ExpressMiddlewareOptions<ServerContext>, 'context'> => ({
	context: async ({ req }) => ({
		dataSources: {
			technologyDataSource: new TechnologyDataSource(
				prismaClient,
				redisClient,
				redisCacheTtlSeconds
			),
		},
		token: req.headers.authorization,
	}),
});
