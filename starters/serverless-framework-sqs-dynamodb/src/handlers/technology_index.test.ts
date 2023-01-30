import type { APIGatewayProxyResult, APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ScanCommand, ServiceInputTypes, ServiceOutputTypes } from '@aws-sdk/client-dynamodb';
import { AwsStub, mockClient } from 'aws-sdk-client-mock';
import { getClient } from '@/utils/dynamodb/getClient';
import { handler } from './technology_index';

describe('GET /technology', () => {
	let subject: APIGatewayProxyResult;
	let ddbMock: AwsStub<ServiceInputTypes, ServiceOutputTypes>;

	beforeAll(async () => {
		ddbMock = mockClient(getClient());
		ddbMock.on(ScanCommand).resolves({
			Items: [],
		});
		subject = (await handler(
			{} as APIGatewayProxyEvent,
			{} as Context,
			{} as Callback
		)) as APIGatewayProxyResult;
	});

	afterAll(() => {
		ddbMock.restore();
	});

	it('returns 200 status', () => {
		expect(subject.statusCode).toEqual(200);
	});

	it('returns a list of technologies', () => {
		expect(JSON.parse(subject.body)).toEqual([]);
	});
});
