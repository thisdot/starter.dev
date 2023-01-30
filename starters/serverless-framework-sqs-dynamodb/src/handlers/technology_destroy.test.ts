import type { APIGatewayProxyResult, APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { DeleteItemCommand, ServiceInputTypes, ServiceOutputTypes } from '@aws-sdk/client-dynamodb';
import { AwsStub, mockClient } from 'aws-sdk-client-mock';
import { getClient } from '@/utils/dynamodb/getClient';
import * as technologyDestroy from '@/models/technology/destroy';
import { handler } from './technology_destroy';

describe('DELETE /technology/:id', () => {
	let subject: APIGatewayProxyResult;
	let ddbMock: AwsStub<ServiceInputTypes, ServiceOutputTypes>;

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
			jest.spyOn(technologyDestroy, 'destroy').mockRejectedValue('fail');
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
		});

		it('returns 500 status', () => {
			expect(subject.statusCode).toEqual(500);
		});

		it('returns server error message', () => {
			expect(subject.body).toEqual(expect.stringContaining('Server Error:'));
		});
	});
});
