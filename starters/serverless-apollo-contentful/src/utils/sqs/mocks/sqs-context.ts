import { Context } from 'aws-lambda';

export const mockSQSContext = (callbackWaitsForEmptyEventLoop?: boolean): Context => ({
	callbackWaitsForEmptyEventLoop: Boolean(callbackWaitsForEmptyEventLoop),
	functionName: 'MOCK_functionName',
	functionVersion: 'MOCK_functionVersion',
	invokedFunctionArn: 'MOCK_invokedFunctionArn',
	memoryLimitInMB: 'MOCK_memoryLimitInMB',
	awsRequestId: 'MOCK_awsRequestId',
	logGroupName: 'MOCK_logGroupName',
	logStreamName: 'MOCK_logStreamName',
	getRemainingTimeInMillis: function (): number {
		throw new Error('Function not implemented.');
	},
	done: function (error?: Error | undefined, result?: any): void {
		throw new Error('Function not implemented.');
	},
	fail: function (error: string | Error): void {
		throw new Error('Function not implemented.');
	},
	succeed: function (messageOrObject: any): void {
		throw new Error('Function not implemented.');
	},
});
