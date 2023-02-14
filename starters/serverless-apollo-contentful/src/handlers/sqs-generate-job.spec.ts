import { handler } from './sqs-generate-job';
import { sendMessage } from '../utils/sqs';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { mockAWSLambdaHandlerContext } from '../utils/test/mocks';

const MOCK_RECORDS_COUNT = 1;
const MOCK_CONTEXT = mockAWSLambdaHandlerContext();
const MOCK_CALLBACK = jest.fn();
const MOCK_SEND_MESSAGE = sendMessage as jest.Mock;
let MOCK_API_GATEWAY_PROXY_EVENT: APIGatewayProxyEvent;

jest.mock('../utils/sqs', () => ({
	sendMessage: jest.fn().mockReturnValue({
		success: true,
		data: {},
	}),
}));

describe('.handler', () => {
	let subject: any;

	describe('when called with event', () => {
		beforeAll(async () => {
			subject = await handler(
				MOCK_API_GATEWAY_PROXY_EVENT,
				MOCK_CONTEXT,
				MOCK_CALLBACK
			);
		});

		it('calls sendMessage with expected arguments', () => {
			expect(MOCK_SEND_MESSAGE).toHaveBeenCalledTimes(MOCK_RECORDS_COUNT);
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
});
