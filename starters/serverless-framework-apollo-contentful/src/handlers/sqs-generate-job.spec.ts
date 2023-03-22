import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handler } from './sqs-generate-job';
import { sendMessage } from '../utils/sqs';

import { mockAWSLambdaHandlerContext } from '../utils/test/mocks';

const MOCK_API_EVENT: APIGatewayProxyEvent = {
	body: JSON.stringify({ message: 'Hello World!' }),
} as unknown as APIGatewayProxyEvent;
const MOCK_CONTEXT = mockAWSLambdaHandlerContext();
const MOCK_CALLBACK = jest.fn();
const MOCK_SEND_MESSAGE = sendMessage as jest.Mock;

jest.mock('../utils/sqs', () => ({
	sendMessage: jest.fn(),
}));

describe('.handler', () => {
	let subject: void | APIGatewayProxyResult;
	const originalMathCeil = Math.ceil;
	const MOCK_MATH_CEIL = jest.fn<number, [number]>();
	beforeAll(() => {
		Math.ceil = MOCK_MATH_CEIL;
	});
	afterAll(() => {
		MOCK_SEND_MESSAGE.mockReset();
		Math.ceil = originalMathCeil;
	});

	describe('when called with event', () => {
		beforeAll(async () => {
			MOCK_SEND_MESSAGE.mockReturnValue({
				success: true,
				data: {},
			});
			MOCK_MATH_CEIL.mockReturnValue(123);
			subject = await handler(MOCK_API_EVENT, MOCK_CONTEXT, MOCK_CALLBACK);
		});

		afterAll(() => {
			MOCK_SEND_MESSAGE.mockReset();
			MOCK_MATH_CEIL.mockReset();
		});

		it('calls sendMessage with expected arguments', () => {
			expect(MOCK_SEND_MESSAGE).toHaveBeenCalledTimes(1);
			expect(MOCK_SEND_MESSAGE).toHaveBeenCalledWith({
				id: 123,
				message: 'Hello World!',
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
