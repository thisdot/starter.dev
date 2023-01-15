import type { Context, Callback, SQSEvent } from 'aws-lambda';
import { handler } from './example_job_processor';

describe('demo', () => {
	let subject: Awaited<ReturnType<typeof handler>>;
	let logMock: jest.SpyInstance;

	beforeAll(async () => {
		logMock = jest.spyOn(console, 'log').mockImplementation(() => {});
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
		expect(console.log).toHaveBeenCalledWith('"Hello"');
		expect(console.log).toHaveBeenCalledWith('"World"');
	});

	it('returns nothing', () => {
		expect(subject).toBeUndefined();
	});
});
