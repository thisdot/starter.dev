import { ServerContext } from './server-context';
import { ExpressMiddlewareOptions } from '@apollo/server/express4';
import { WithRequired } from '@apollo/utils.withrequired';
import { TechnologyDataSource } from '../data-sources';
import { PrismaClient, TechnologyEntity } from '@prisma/client';
import { createCacheAPIWrapperAsync } from '../../cache';

export const createServerContextMiddlewareOptionsAsync = async (): Promise<
	WithRequired<ExpressMiddlewareOptions<ServerContext>, 'context'>
> => {
	const prismaClient = new PrismaClient();
	const technologyCacheAPIWrapper = await createCacheAPIWrapperAsync<TechnologyEntity>(
		'technology'
	);
	const technologyDataSource = technologyCacheAPIWrapper
		? new TechnologyDataSource(prismaClient, technologyCacheAPIWrapper)
		: new TechnologyDataSource(prismaClient);

	return {
		context: async ({ req }) => ({
			dataSources: {
				technologyDataSource,
			},
			token: req.headers.authorization,
		}),
	};
};
