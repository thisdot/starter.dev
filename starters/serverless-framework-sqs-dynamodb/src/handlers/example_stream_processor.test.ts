import type { Context, Callback, DynamoDBStreamEvent } from 'aws-lambda';
import { handler } from './example_stream_processor';

describe('demo', () => {
	let subject: Awaited<ReturnType<typeof handler>>;
	let logMock: jest.SpyInstance;

	beforeAll(async () => {
		logMock = jest.spyOn(console, 'log').mockImplementation(() => ({}));
		subject = await handler(
			{
				Records: [
					{
						eventName: 'INSERT',
						dynamodb: {
							NewImage: {
								id: 1,
								name: 'Test',
							},
						},
					},
					{
						eventName: 'MODIFY',
						dynamodb: {
							OldImage: {
								id: 1,
								name: 'Test',
							},
							NewImage: {
								id: 1,
								name: 'Test 2',
							},
						},
					},
					{
						eventName: 'REMOVE',
						dynamodb: {
							OldImage: {
								id: 1,
								name: 'Test 2',
							},
						},
					},
				],
			} as DynamoDBStreamEvent,
			{} as Context,
			{} as Callback
		);
	});

	afterAll(() => {
		logMock.mockReset();
	});

	it('process INSERT messages', () => {
		expect(console.log).toHaveBeenCalledWith('Inserted Record', {
			id: 1,
			name: 'Test',
		});
	});

	it('process MODIFY messages', () => {
		expect(console.log).toHaveBeenCalledWith('Updated Record');
		expect(console.log).toHaveBeenCalledWith('New Values', {
			id: 1,
			name: 'Test 2',
		});
		expect(console.log).toHaveBeenCalledWith('Old Values', {
			id: 1,
			name: 'Test',
		});
	});

	it('process REMOVE messages', () => {
		expect(console.log).toHaveBeenCalledWith('Removed Record', {
			id: 1,
			name: 'Test 2',
		});
	});

	it('returns nothing', () => {
		expect(subject).toBeUndefined();
	});
});
