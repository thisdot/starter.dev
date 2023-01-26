import { ServerContext, ServerContextDataSources } from './server-context';
import { ExpressMiddlewareOptions } from '@apollo/server/express4';
import { WithRequired } from '@apollo/utils.withrequired';
import { TechnologyDataSource } from '../data-sources';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

const dataSources: ServerContextDataSources = {
	technologyDataSource: new TechnologyDataSource(prismaClient),
};

export const serverContextMiddlewareOptions: WithRequired<
	ExpressMiddlewareOptions<ServerContext>,
	'context'
> = {
	context: async ({ req }) => ({
		dataSources,
		token: req.headers.authorization,
	}),
};
