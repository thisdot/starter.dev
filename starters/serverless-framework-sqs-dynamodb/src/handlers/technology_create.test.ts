import type { APIGatewayProxyResult, APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { PutItemCommand, ServiceInputTypes, ServiceOutputTypes } from '@aws-sdk/client-dynamodb';
import { AwsStub, mockClient } from 'aws-sdk-client-mock';
import { getClient } from '@/utils/dynamodb/getClient';
import * as technologyCreate from '@/models/technology/create';
import { handler } from './technology_create';

describe('POST /technology', () => {
	let subject: APIGatewayProxyResult;
	let ddbMock: AwsStub<ServiceInputTypes, ServiceOutputTypes>;

	describe('when record is created', () => {
		beforeAll(async () => {
			ddbMock = mockClient(getClient());
			ddbMock.on(PutItemCommand).resolves({
				Attributes: undefined,
			});
			subject = (await handler(
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
			subject = (await handler(
				{} as unknown as APIGatewayProxyEvent,
				{} as Context,
				{} as Callback
			)) as APIGatewayProxyResult;
		});

		afterAll(async () => {
			jest.restoreAllMocks();
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
			jest.spyOn(technologyCreate, 'create').mockRejectedValue('fail');
			subject = (await handler(
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
		});

		it('returns 500 status', () => {
			expect(subject.statusCode).toEqual(500);
		});

		it('returns server error message', () => {
			expect(subject.body).toEqual(expect.stringContaining('Server Error:'));
		});
	});
});
