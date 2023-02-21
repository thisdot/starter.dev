import { ApolloServer } from '@apollo/server';
import { ExpressMiddlewareOptions } from '@apollo/server/dist/esm/express4';
import { RequestHandler } from 'express';
import { graphqlServer, createGraphqlServerMiddlewareAsync } from './graphql-server';
import { ServerContext } from './server-context';
import { createServerContextMiddlewareOptionsAsync } from './server-context/server-context-middleware-options';
import { expressMiddleware } from '@apollo/server/express4';
import { WithRequired } from '@apollo/utils.withrequired';

describe('graphqlServer', () => {
	it('creates server instance', () => {
		expect(graphqlServer).toBeInstanceOf(ApolloServer);
	});
});

jest.mock('./server-context/server-context-middleware-options', () => ({
	createServerContextMiddlewareOptionsAsync: jest.fn(),
}));

jest.mock('@apollo/server/express4', () => ({
	expressMiddleware: jest.fn(),
}));

const MOCK_CREATE_SERVER_MIDDLEWARE_OPTIONS =
	createServerContextMiddlewareOptionsAsync as jest.Mock;

const MOCK_EXPRESS_MIDDLEWARE = expressMiddleware as jest.Mock;

describe('createGraphqlServerMiddlewareAsync', () => {
	const MOCK_OPTIONS =
		jest.mock<WithRequired<ExpressMiddlewareOptions<ServerContext>, 'context'>>('');

	beforeAll(async () => {
		MOCK_CREATE_SERVER_MIDDLEWARE_OPTIONS.mockResolvedValue(MOCK_OPTIONS);
		await createGraphqlServerMiddlewareAsync();
	});

	describe('when called', () => {
		it('calls expressMiddleware with server and options', async () => {
			expect(MOCK_EXPRESS_MIDDLEWARE).toHaveBeenCalledTimes(1);
			expect(MOCK_EXPRESS_MIDDLEWARE).toHaveBeenCalledWith(graphqlServer, MOCK_OPTIONS);
		});

		it('calls createServerContextMiddlewareOptionsAsync', async () => {
			expect(MOCK_CREATE_SERVER_MIDDLEWARE_OPTIONS).toHaveBeenCalledTimes(1);
		});
	});
});
