import type { APIGatewayProxyResult, APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { GetItemCommand, ServiceInputTypes, ServiceOutputTypes } from '@aws-sdk/client-dynamodb';
import { AwsStub, mockClient } from 'aws-sdk-client-mock';
import { getClient } from '@/utils/dynamodb/getClient';
import { removeFromCache } from '@/utils/cache/removeFromCache';
import * as technologyGet from '@/models/technology/get';
import { getCacheKey } from '@/models/technology/getCacheKey';
import { handler } from './technology_show';

describe('GET /technology/:id', () => {
	let subject: APIGatewayProxyResult;
	let ddbMock: AwsStub<ServiceInputTypes, ServiceOutputTypes>;

	beforeAll(() => {
		jest.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	describe('when no id provided', () => {
		beforeAll(async () => {
			subject = (await handler(
				{
					pathParameters: {
						id: null,
					},
				} as unknown as APIGatewayProxyEvent,
				{} as Context,
				{} as Callback
			)) as APIGatewayProxyResult;
		});

		it('returns 400 status', () => {
			expect(subject.statusCode).toEqual(400);
		});

		it('returns bad request message', () => {
			expect(subject.body).toEqual('Bad Request: no id provided');
		});
	});

	describe('when record not found', () => {
		beforeAll(async () => {
			ddbMock = mockClient(getClient());
			ddbMock.on(GetItemCommand).resolves({
				Item: undefined,
			});
			subject = (await handler(
				{
					pathParameters: {
						id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
					},
				} as unknown as APIGatewayProxyEvent,
				{} as Context,
				{} as Callback
			)) as APIGatewayProxyResult;
		});

		afterAll(async () => {
			ddbMock.restore();
			await removeFromCache(getCacheKey('87af19b1-aa0d-4178-a30c-2fa8cd1f2cff'));
		});

		it('returns 404 status', () => {
			expect(subject.statusCode).toEqual(404);
		});

		it('returns null', () => {
			expect(JSON.parse(subject.body)).toBeNull();
		});
	});

	describe('when record is found', () => {
		beforeAll(async () => {
			ddbMock = mockClient(getClient());
			ddbMock.on(GetItemCommand).resolves({
				Item: {
					description: {
						S: 'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
					},
					id: { S: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff' },
					websiteUrl: { S: 'https://jestjs.io/' },
					displayName: { S: 'Jest' },
				},
			});
			subject = (await handler(
				{
					pathParameters: {
						id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
					},
				} as unknown as APIGatewayProxyEvent,
				{} as Context,
				{} as Callback
			)) as APIGatewayProxyResult;
		});

		afterAll(async () => {
			ddbMock.restore();
			await removeFromCache(getCacheKey('87af19b1-aa0d-4178-a30c-2fa8cd1f2cff'));
		});

		it('returns 200 status', () => {
			expect(subject.statusCode).toEqual(200);
		});

		it('returns the requested record', () => {
			expect(JSON.parse(subject.body)).toEqual({
				description:
					'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
				id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
				websiteUrl: 'https://jestjs.io/',
				displayName: 'Jest',
			});
		});
	});

	describe('when error occurs', () => {
		beforeAll(async () => {
			jest.spyOn(technologyGet, 'get').mockRejectedValue('fail');
			subject = (await handler(
				{
					pathParameters: {
						id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
					},
				} as unknown as APIGatewayProxyEvent,
				{} as Context,
				{} as Callback
			)) as APIGatewayProxyResult;
		});

		afterAll(async () => {
			jest.restoreAllMocks();
			await removeFromCache(getCacheKey('87af19b1-aa0d-4178-a30c-2fa8cd1f2cff'));
		});

		it('returns 500 status', () => {
			expect(subject.statusCode).toEqual(500);
		});

		it('returns server error message', () => {
			expect(subject.body).toEqual(expect.stringContaining('Server Error:'));
		});
	});
});
