import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from './sqs-generate-job';
import { sendMessage } from '../utils/sqs';

import { mockAWSLambdaHandlerContext } from '../utils/test/mocks';

let MOCK_API_EVENT: APIGatewayProxyEvent;
const MOCK_CONTEXT = mockAWSLambdaHandlerContext();
const MOCK_CALLBACK = jest.fn();
const MOCK_SEND_MESSAGE = sendMessage as jest.Mock;

jest.mock('../utils/sqs', () => ({
	sendMessage: jest.fn(),
}));

const mockMath = Object.create(global.Math);
mockMath.ceil = () => 0;
global.Math = mockMath;

describe('.handler', () => {
	// let subject: (event: any, context: any, callback: any): void | Promise<...>;
	let subject: any;

	afterAll(() => {
		MOCK_SEND_MESSAGE.mockReset();
	});

	describe('when called with event', () => {
		beforeAll(async () => {
			MOCK_SEND_MESSAGE.mockReturnValue({
				success: true,
				data: {},
			});
			subject = await handler(MOCK_API_EVENT, MOCK_CONTEXT, MOCK_CALLBACK);
		});

		afterAll(() => {
			MOCK_SEND_MESSAGE.mockReset();
		});

		it('calls sendMessage with expected arguments', () => {
			expect(MOCK_SEND_MESSAGE).toHaveBeenCalledTimes(1);
			expect(MOCK_SEND_MESSAGE).toHaveBeenCalledWith({
				id: 0,
				message: 'Hello World!',
			});
		});

		it('sendMessage returns expected result', () => {
			const actualCallsResults = MOCK_SEND_MESSAGE.mock.results[0];
			const rval = actualCallsResults.value;
			expect(rval).toEqual({
				success: true,
				data: {},
			});
		});

		it('returns expected response', () => {
			expect(subject).toEqual({
				statusCode: 200,
				body: '{}',
			});
		});
	});

	describe('when sendMessage fails', () => {
		beforeAll(async () => {
			MOCK_SEND_MESSAGE.mockReturnValue({
				success: false,
				data: {},
			});
			subject = await handler(MOCK_API_EVENT, MOCK_CONTEXT, MOCK_CALLBACK);
		});

		afterAll(() => {
			MOCK_SEND_MESSAGE.mockReset();
		});

		it('should have different statusCode if sendMessage fails', () => {
			expect(subject).toEqual({
				statusCode: 400,
				body: '{}',
			});
		});
	});
});
