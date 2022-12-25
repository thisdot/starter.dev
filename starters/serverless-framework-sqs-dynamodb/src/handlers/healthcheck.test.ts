import type { APIGatewayProxyEvent, Context, Callback, APIGatewayProxyResult } from 'aws-lambda';
import { handler } from './healthcheck';

describe('healtcheck', () => {
	let subject: APIGatewayProxyResult;

	beforeAll(async () => {
		subject = (await handler(
			{} as APIGatewayProxyEvent,
			{} as Context,
			{} as Callback
		)) as APIGatewayProxyResult;
	});

	it('returns a 200 statusCode', () => {
		expect(subject.statusCode).toBe(200);
	});

	it('returns a working message', () => {
		expect(subject.body).toEqual('public-api is working!');
	});
});
