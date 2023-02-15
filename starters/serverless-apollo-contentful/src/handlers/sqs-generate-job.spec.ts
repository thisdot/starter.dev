import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from './sqs-generate-job';
import { sendMessage } from '../utils/sqs';

import { mockAWSLambdaHandlerContext } from '../utils/test/mocks';

let MOCK_API_EVENT: APIGatewayProxyEvent;
const MOCK_CONTEXT = mockAWSLambdaHandlerContext();
const MOCK_CALLBACK = jest.fn();
const MOCK_SEND_MESSAGE = sendMessage as jest.Mock;

let SUCCESS = false;
jest.mock('../utils/sqs', () => ({
	sendMessage: jest.fn(),
}));

describe('.handler', () => {
	let subject: any;

	afterAll(() => {
		MOCK_SEND_MESSAGE.mockReset();
	});

	describe('when called with event', () => {
		beforeAll(async () => {
			subject = await handler(MOCK_API_EVENT, MOCK_CONTEXT, MOCK_CALLBACK);
		});

		it('calls sendMessage with expected arguments', () => {
			expect(MOCK_SEND_MESSAGE).toHaveBeenCalledTimes(1);
			const actualCallsArgs = MOCK_SEND_MESSAGE.mock.calls[0][0];
			expect(actualCallsArgs).toHaveProperty('message');
			expect(actualCallsArgs.message).toEqual('Hello World!');
		});

		it('sendMessage returns expected result', () => {
			const actualCallsResults = MOCK_SEND_MESSAGE.mock.results[0];
			const rval = actualCallsResults.value;
			expect(rval).toHaveProperty('success');
			expect(rval).toHaveProperty('data');
			expect(rval.success).toEqual(true);
		});

		it('returns expected response', () => {
			expect(subject).toHaveProperty('statusCode');
			expect(subject).toHaveProperty('body');
			expect(subject.statusCode).toEqual(200);
			expect(subject.body).toEqual('{}');
		});
	});

	describe('when sendMessage fails', () => {
		beforeAll(async () => {
			subject = await handler(MOCK_API_EVENT, MOCK_CONTEXT, MOCK_CALLBACK);
		});

		it('should have different statusCode if sendMessage fails', () => {
			expect(subject).toHaveProperty('statusCode');
			expect(subject).toHaveProperty('body');
			expect(subject.statusCode).toEqual(400);
			expect(subject.body).toEqual('{}');
		});
	});
});
