import {
	APIGatewayProxyEvent,
	Context,
	Callback,
	APIGatewayProxyResult,
} from 'aws-lambda';
import { redisClient } from '../utils/redis';
import { handler } from './healthcheck';

jest.mock('../utils/redis', () => ({
	redisClient: {
		get: jest.fn(),
	},
}));

const MOCK_REDIS_CLIENT_GET = <jest.Mock>redisClient.get;
const MOCK_EXPECTED_REDIS_PING_KEY = '';

jest.mock('../utils/contentful', () => ({
	checkHealth: jest.fn(),
}));

describe('.handler', () => {
	describe('when called', () => {

		describe.each([
			['and redisClient.get does not throw error', 'and contentful healthy', new Error,() => ]
		]);
		describe('and redisClient.get does not throw error', () => {
			beforeAll(() => {
				MOCK_REDIS_CLIENT_GET.mockResolvedValue(null);

			});

			afterAll(() => {
				MOCK_REDIS_CLIENT_GET.mockReset();
			});

			it('calls redisClient.get with expected argument', () => {
				expect(MOCK_REDIS_CLIENT_GET).toHaveBeenCalledTimes(1);
				expect(MOCK_REDIS_CLIENT_GET).toHaveBeenCalledWith(MOCK_EXPECTED_REDIS_PING_KEY);
			});

			it('returns expected result', () => {

			})
		})

		describe('and redisClient.get method throws error', () => {
			beforeAll(() => {

			});

			it('calls redisClient.get with expected argument', () => {

			})

			it('returns expected result', () => {

			})
		})
	})
	let subject: APIGatewayProxyResult | void;

	beforeAll(async () => {
		subject = await handler(
			{} as APIGatewayProxyEvent,
			{} as Context,
			{} as Callback
		);
	});

	it('returns a 200 status code', () => {
		expect(subject?.statusCode).toBe(200);
	});

	it('returns an okay', () => {
		expect(subject?.body).toEqual('Okay!');
	});
});
