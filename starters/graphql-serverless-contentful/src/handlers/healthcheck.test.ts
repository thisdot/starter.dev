import {
	APIGatewayProxyEvent,
	Context,
	Callback,
	APIGatewayProxyResult,
} from 'aws-lambda';
import { handler } from './healthcheck';

describe('healthcheck', () => {
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
