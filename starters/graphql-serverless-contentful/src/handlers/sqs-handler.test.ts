import { Context, Callback, SQSEvent, SQSBatchResponse } from 'aws-lambda';
import { handler } from './sqs-handler';

describe('demo', () => {
	let subject: void | SQSBatchResponse;
	let logMock: jest.SpyInstance<
		void,
		[message?: any, ...optionalParams: any[]]
	>;

	beforeAll(async () => {
		logMock = jest.spyOn(console, 'log').mockImplementation(() => ({}));
		subject = await handler(
			{
				Records: [
					{
						body: 'Hello',
					},
					{
						body: 'World',
					},
				],
			} as SQSEvent,
			{} as Context,
			{} as Callback
		);
	});

	afterAll(() => {
		logMock.mockReset();
	});

	it('processes both messages', () => {
		expect(console.log).toHaveBeenCalledWith('Job Message:', '"Hello"');
		expect(console.log).toHaveBeenCalledWith('Job Message:', '"World"');
	});

	it('returns nothing', () => {
		expect(subject).toBeUndefined();
	});
});
