import { APIGatewayProxyResult, APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import {
	ScanCommand,
	GetItemCommand,
	PutItemCommand,
	DeleteItemCommand,
	ServiceInputTypes,
	ServiceOutputTypes,
} from '@aws-sdk/client-dynamodb';
import { AwsStub, mockClient } from 'aws-sdk-client-mock';
import { getClient } from '@/utils/dynamodb';
import { removeFromCache } from '@/utils/cache';
import * as technology from '@/models/technology';
import { getCacheKey } from '@/models/technology';
import { index, create, show, update, destroy } from './technology';

describe('GET /technology', () => {
	let subject: APIGatewayProxyResult;
	let ddbMock: AwsStub<ServiceInputTypes, ServiceOutputTypes>;

	beforeAll(async () => {
		ddbMock = mockClient(getClient());
		ddbMock.on(ScanCommand).resolves({
			Items: [],
		});
		subject = (await index(
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

describe('POST /technology', () => {
	let subject: APIGatewayProxyResult;
	let ddbMock: AwsStub<ServiceInputTypes, ServiceOutputTypes>;

	describe('when record is created', () => {
		beforeAll(async () => {
			ddbMock = mockClient(getClient());
			ddbMock.on(PutItemCommand).resolves({
				Attributes: undefined,
			});
			subject = (await create(
				{
					body: JSON.stringify({
						description:
							'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
						websiteUrl: 'https://jestjs.io/',
						displayName: 'Valid Test',
					}),
				} as unknown as APIGatewayProxyEvent,
				{} as Context,
				{} as Callback
			)) as APIGatewayProxyResult;
		});

		afterAll(async () => {
			ddbMock.restore();
			await removeFromCache(getCacheKey('87af19b1-aa0d-4178-a30c-2fa8cd1f2cff'));
		});

		it('returns 201 status', () => {
			expect(subject.statusCode).toEqual(201);
		});

		it('returns the created record', () => {
			expect(JSON.parse(subject.body)).toEqual({
				description:
					'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
				id: expect.any(String),
				websiteUrl: 'https://jestjs.io/',
				displayName: 'Valid Test',
			});
		});
	});

	describe('when invalid inputs', () => {
		beforeAll(async () => {
			jest.spyOn(console, 'error').mockImplementation(() => {});
			subject = (await create(
				{} as unknown as APIGatewayProxyEvent,
				{} as Context,
				{} as Callback
			)) as APIGatewayProxyResult;
		});

		afterAll(async () => {
			jest.restoreAllMocks();
			await removeFromCache(getCacheKey('87af19b1-aa0d-4178-a30c-2fa8cd1f2cff'));
		});

		it('returns 400 status', () => {
			expect(subject.statusCode).toEqual(400);
		});

		it('returns form error', () => {
			const parsedResp = JSON.parse(subject.body);
			expect(parsedResp).toHaveProperty('formErrors');
			expect(parsedResp).toHaveProperty('fieldErrors');
		});
	});

	describe('when error occurs', () => {
		beforeAll(async () => {
			jest.spyOn(console, 'error').mockImplementation(() => {});
			jest.spyOn(technology, 'create').mockRejectedValue('fail');
			subject = (await create(
				{
					body: JSON.stringify({
						description:
							'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
						websiteUrl: 'https://jestjs.io/',
						displayName: 'Valid Test',
					}),
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
			subject = (await show(
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
			subject = (await show(
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
			subject = (await show(
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
			jest.spyOn(technology, 'get').mockRejectedValue('fail');
			subject = (await show(
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

describe('PUT /technology/:id', () => {
	let subject: APIGatewayProxyResult;
	let ddbMock: AwsStub<ServiceInputTypes, ServiceOutputTypes>;

	describe('when no id provided', () => {
		beforeAll(async () => {
			subject = (await update(
				{
					pathParameters: {
						id: null,
					},
					body: JSON.stringify({
						displayName: 'Valid Test',
					}),
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
			jest.spyOn(console, 'error').mockImplementation(() => {});
			subject = (await update(
				{
					pathParameters: {
						id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
					},
					body: JSON.stringify({
						displayName: 'Valid Test',
					}),
				} as unknown as APIGatewayProxyEvent,
				{} as Context,
				{} as Callback
			)) as APIGatewayProxyResult;
		});

		afterAll(async () => {
			ddbMock.restore();
			await removeFromCache(getCacheKey('87af19b1-aa0d-4178-a30c-2fa8cd1f2cff'));
			jest.resetAllMocks();
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
			ddbMock.on(GetItemCommand).resolvesOnce({
				Item: {
					description: {
						S: 'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
					},
					id: { S: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff' },
					websiteUrl: { S: 'https://jestjs.io/' },
					displayName: { S: 'Jest' },
				},
			});
			ddbMock.on(PutItemCommand).resolves({
				Attributes: {
					description: {
						S: 'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
					},
					id: { S: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff' },
					websiteUrl: { S: 'https://jestjs.io/' },
					displayName: { S: 'Valid Test' },
				},
			});
			subject = (await update(
				{
					pathParameters: {
						id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
					},
					body: JSON.stringify({
						displayName: 'Valid Test',
					}),
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

		it('returns the updated record', () => {
			expect(JSON.parse(subject.body)).toEqual({
				description:
					'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
				id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
				websiteUrl: 'https://jestjs.io/',
				displayName: 'Valid Test',
			});
		});
	});

	describe('when invalid inputs', () => {
		beforeAll(async () => {
			jest.spyOn(console, 'error').mockImplementation(() => {});
			subject = (await update(
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

		it('returns 400 status', () => {
			expect(subject.statusCode).toEqual(400);
		});

		it('returns form error', () => {
			const parsedResp = JSON.parse(subject.body);
			expect(parsedResp).toHaveProperty('formErrors');
			expect(parsedResp).toHaveProperty('fieldErrors');
		});
	});

	describe('when error occurs', () => {
		beforeAll(async () => {
			jest.spyOn(console, 'error').mockImplementation(() => {});
			jest.spyOn(technology, 'update').mockRejectedValue('fail');
			subject = (await update(
				{
					pathParameters: {
						id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
					},
					body: JSON.stringify({
						displayName: 'Error Test',
					}),
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

describe('DELETE /technology/:id', () => {
	let subject: APIGatewayProxyResult;
	let ddbMock: AwsStub<ServiceInputTypes, ServiceOutputTypes>;

	describe('when no id provided', () => {
		beforeAll(async () => {
			subject = (await destroy(
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

	describe('when record maybe deleted', () => {
		beforeAll(async () => {
			ddbMock = mockClient(getClient());
			ddbMock.on(DeleteItemCommand).resolves({
				Attributes: {
					description: {
						S: 'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
					},
					id: { S: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff' },
					websiteUrl: { S: 'https://jestjs.io/' },
					displayName: { S: 'Jest' },
				},
			});
			subject = (await destroy(
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
		});

		it('returns 200 status', () => {
			expect(subject.statusCode).toEqual(200);
		});

		it('returns deleted object if it exists', () => {
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
			jest.spyOn(console, 'error').mockImplementation(() => {});
			jest.spyOn(technology, 'destroy').mockRejectedValue('fail');
			subject = (await destroy(
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
		});

		it('returns 500 status', () => {
			expect(subject.statusCode).toEqual(500);
		});

		it('returns server error message', () => {
			expect(subject.body).toEqual(expect.stringContaining('Server Error:'));
		});
	});
});
