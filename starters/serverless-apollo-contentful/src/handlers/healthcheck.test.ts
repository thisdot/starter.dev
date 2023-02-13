import {
	APIGatewayProxyEvent,
	Context,
	Callback,
	APIGatewayProxyResult,
} from 'aws-lambda';
import { handler, HealthCheckResult } from './healthcheck';
import { getContentfulHealth } from '../utils/contentful';

const MOCK_GET_CONTENTFUL_HEALTH = getContentfulHealth as jest.Mock;
jest.mock('../utils/contentful', () => ({
	getContentfulHealth: jest.fn(),
}));

describe('healthcheck', () => {
	let subject: APIGatewayProxyResult | void;

	beforeAll(async () => {
		subject = await handler(
			{} as APIGatewayProxyEvent,
			{} as Context,
			{} as Callback
		);
	});

	// it('returns a 200 status code', () => {
	// 	expect(subject?.statusCode).toBe(200);
	// });

	// it('returns an okay', () => {
	// 	expect(subject?.body).toEqual('Okay!');
	// });

	// describe('returns a 200 status code', () => {
	// 	let result: HealthCheckResult;
	// 	beforeAll(async () => {
	// 		MOCK_GET_CONTENTFUL_HEALTH.mockResolvedValue(true);
	// 		result = {
	// 			cacheDatabase: true,
	// 			contentful: await getContentfulHealth(),
	// 		};
	// 	});
	// 	it('should return a 200 status code', () => {
	// 		expect(subject?.statusCode).toBe(200);
	// 		expect(subject?.body).toEqual(JSON.stringify(result));
	// 	});
	// });
	// describe('returns a 503 status code', () => {
	// 	let result: HealthCheckResult;
	// 	beforeAll(async () => {
	// 		MOCK_GET_CONTENTFUL_HEALTH.mockResolvedValue(false);
	// 		result = {
	// 			cacheDatabase: true,
	// 			contentful: await getContentfulHealth(),
	// 		};
	// 	});
	// 	it('should return a 503 status code', () => {
	// 		expect(subject?.statusCode).toBe(503);
	// 		expect(subject?.body).toEqual(JSON.stringify(result));
	// 	});
	// });
});
