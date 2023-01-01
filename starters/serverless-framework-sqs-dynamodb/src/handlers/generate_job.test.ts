import type { APIGatewayProxyResult, APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { sendMessage } from '@/utils/sqs/sendMessage';
import { handler } from './generate_job';

jest.mock('@/utils/sqs/sendMessage');

describe('POST /generate_job', () => {
	let subject: APIGatewayProxyResult;
	let mathRandomMock: jest.SpyInstance;

	const sendMessageMock = jest.mocked(sendMessage);

	beforeAll(() => {
		mathRandomMock = jest.spyOn(global.Math, 'random').mockReturnValue(0.11);
	});

	afterAll(() => {
		mathRandomMock.mockRestore();
		jest.clearAllMocks();
	});

	describe('when the message is sent successfully', () => {
		beforeAll(async () => {
			sendMessageMock.mockResolvedValue({
				success: true,
				data: {
					MessageId: '123456789',
				},
			});
			subject = (await handler(
				{} as APIGatewayProxyEvent,
				{} as Context,
				{} as Callback
			)) as APIGatewayProxyResult;
		});

		afterAll(() => {
			sendMessageMock.mockClear();
		});

		it('returns a 201 status code', () => {
			expect(subject.statusCode).toBe(201);
		});

		it('returns the returned messaged', () => {
			expect(JSON.parse(subject.body)).toEqual({
				MessageId: '123456789',
			});
		});
	});

	describe('when the message is not sent successfully', () => {
		beforeAll(async () => {
			sendMessageMock.mockResolvedValue({
				success: false,
				data: 'bad request',
			});
			subject = (await handler(
				{} as APIGatewayProxyEvent,
				{} as Context,
				{} as Callback
			)) as APIGatewayProxyResult;
		});

		afterAll(() => {
			sendMessageMock.mockClear();
		});

		it('returns a 400 status code', () => {
			expect(subject.statusCode).toBe(400);
		});

		it('returns the returned messaged', () => {
			expect(JSON.parse(subject.body)).toEqual('bad request');
		});
	});
});
