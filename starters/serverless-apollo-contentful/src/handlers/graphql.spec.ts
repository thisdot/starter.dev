import { ApolloServer, BaseContext } from '@apollo/server';
import { startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import { redisClient } from '../utils/redis';
import gql from 'graphql-tag';
import { apolloServer, server } from './graphql';
import { Handler } from 'aws-lambda';

jest.mock('../utils/redis', () => ({
	redisClient: {},
}));

const mockHandler = () => ({});

jest.mock('@as-integrations/aws-lambda', () => ({
	startServerAndCreateLambdaHandler: jest.fn(),
}));

// const typeDefsMock = gql`
// 	type Query {
// 		test: String!
// 	}
// `;

// const resolvers = {
// 	Query: {
// 		test: jest.fn(() => 'Test passed!'),
// 	},
// };
// jest.mock(('../schema') => {
// 	typeDefs: mergeTypeDefs[(typeDefsMock)]
// })

const originalEnv = process.env;

describe('.server', () => {
	beforeAll(() => {
		process.env = {
			REDIS_CACHE_TTL_SECONDS: '900',
		};
		const MOCK_SERVER = startServerAndCreateLambdaHandler as jest.Mock;
		MOCK_SERVER.mockReturnValue(mockHandler);
	});

	afterAll(() => {
		process.env = originalEnv;
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(server).toBeDefined();
		expect(server).toEqual(mockHandler);
	});
});
