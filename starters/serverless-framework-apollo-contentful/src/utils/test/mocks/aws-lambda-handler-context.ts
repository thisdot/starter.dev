import { Context } from 'aws-lambda';

export const mockAWSLambdaHandlerContext = (callbackWaitsForEmptyEventLoop?: boolean): Context => ({
	callbackWaitsForEmptyEventLoop: Boolean(callbackWaitsForEmptyEventLoop),
	functionName: 'MOCK_functionName',
	functionVersion: 'MOCK_functionVersion',
	invokedFunctionArn: 'MOCK_invokedFunctionArn',
	memoryLimitInMB: 'MOCK_memoryLimitInMB',
	awsRequestId: 'MOCK_awsRequestId',
	logGroupName: 'MOCK_logGroupName',
	logStreamName: 'MOCK_logStreamName',
	getRemainingTimeInMillis: jest.fn<number, []>(),
	done: jest.fn<void, [Error | undefined, unknown | undefined]>(),
	fail: jest.fn<void, [string | Error]>(),
	succeed: jest.fn<void, [unknown]>(),
});
