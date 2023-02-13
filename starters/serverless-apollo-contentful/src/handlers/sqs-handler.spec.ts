import { handler } from './sqs-handler';

import { mockSQSEvent, mockAWSLambdaHandlerContext } from '../utils/mocks';

const MOCK_RECORDS_COUNT = 2;
const MOCK_SQS_EVENT = mockSQSEvent(MOCK_RECORDS_COUNT);
const MOCK_CONTEXT = mockAWSLambdaHandlerContext();
const MOCK_CALLBACK = jest.fn();

describe('.handler', () => {
	const MOCK_CONSOLE_LOG = jest.fn();
	const originalConsoleLog = console.log;

	beforeAll(() => {
		console.log = MOCK_CONSOLE_LOG;
	});

	afterAll(() => {
		console.log = originalConsoleLog;
	});

	describe('when called with event', () => {
		beforeAll(async () => {
			await handler(MOCK_SQS_EVENT, MOCK_CONTEXT, MOCK_CALLBACK);
		});

		afterAll(() => {
			MOCK_CONSOLE_LOG.mockReset();
		});

		it('calls console.log method for each record with expected arguments', () => {
			expect(MOCK_CONSOLE_LOG).toHaveBeenCalledTimes(MOCK_RECORDS_COUNT);
			const actualCallsArgs = MOCK_CONSOLE_LOG.mock.calls;
			const expectedCallsArgs = MOCK_SQS_EVENT.Records.map((rec) => [
				'Job Message:',
				`"${rec.body}"`,
			]);
			expect(actualCallsArgs).toEqual(expectedCallsArgs);
		});
	});
});
