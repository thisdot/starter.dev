import { ApolloServer } from '@apollo/server';
import { RequestHandler } from 'express';
import { graphqlServer, createGraphqlServerMiddlewareAsync } from './graphql-server';
import { createServerContextMiddlewareOptionsAsync } from './server-context/server-context-middleware-options';
import { expressMiddleware } from '@apollo/server/express4';
import { createMockExpressMiddlewareOptions } from '../../mocks/graphql-server';

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

const MOCK_OPTIONS = createMockExpressMiddlewareOptions();
const MOCK_REQUEST_HANDLER: jest.MockedFn<RequestHandler> = jest.fn();

describe('createGraphqlServerMiddlewareAsync', () => {
	describe('when called', () => {
		let result: RequestHandler;

		beforeAll(async () => {
			MOCK_CREATE_SERVER_MIDDLEWARE_OPTIONS.mockResolvedValue(MOCK_OPTIONS);
			MOCK_EXPRESS_MIDDLEWARE.mockResolvedValue(MOCK_REQUEST_HANDLER);
			result = await createGraphqlServerMiddlewareAsync();
		});

		afterAll(() => {
			MOCK_CREATE_SERVER_MIDDLEWARE_OPTIONS.mockReset();
			MOCK_EXPRESS_MIDDLEWARE.mockReset();
		});

		it('calls createServerContextMiddlewareOptionsAsync', async () => {
			expect(MOCK_CREATE_SERVER_MIDDLEWARE_OPTIONS).toHaveBeenCalledTimes(1);
		});

		it('calls expressMiddleware with server and options', async () => {
			expect(MOCK_EXPRESS_MIDDLEWARE).toHaveBeenCalledTimes(1);
			expect(MOCK_EXPRESS_MIDDLEWARE).toHaveBeenCalledWith(graphqlServer, MOCK_OPTIONS);
		});

		it('returns expected result', () => {
			expect(result).toBe(MOCK_REQUEST_HANDLER);
		});
	});
});
