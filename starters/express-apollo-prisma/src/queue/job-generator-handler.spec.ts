import { createMockExpressRequest, createMockExpressResponse } from '../mocks/express';
import { generateJob } from './job-generator';
import {
	DEFAULT_JOB_MESSAGE,
	jobGeneratorHandler,
	JobGeneratorHandlerRequestBody,
} from './job-generator-handler';

jest.mock('./job-generator', () => ({
	generateJob: jest.fn(),
}));

const MOCK_GENERATE_JOB = generateJob as jest.MockedFn<typeof generateJob>;
const MOCK_REQUEST = createMockExpressRequest();
const MOCK_RESPONSE = createMockExpressResponse();
const MOCK_RESPONSE_SEND_STATUS = MOCK_RESPONSE.sendStatus as jest.MockedFn<
	typeof MOCK_RESPONSE.sendStatus
>;

const MOCK_NEXT = jest.fn();

describe('.jobGeneratorHandler', () => {
	describe('when called', () => {
		const MOCK_REQUEST_BODY_MESSAGE = 'MOCK_MESSAGE';
		const CASES: [string, JobGeneratorHandlerRequestBody, string][] = [
			[
				'request contains the message in the body',
				{
					message: MOCK_REQUEST_BODY_MESSAGE,
				},
				MOCK_REQUEST_BODY_MESSAGE,
			],
			['request does not contain the message in the body', undefined, DEFAULT_JOB_MESSAGE],
		];

		describe.each(CASES)('and %s', (_, mockedBody, expectedMessage) => {
			let originalBody: unknown;

			beforeAll(() => {
				originalBody = MOCK_REQUEST.body;
				MOCK_REQUEST.body = mockedBody;
			});

			afterAll(() => {
				MOCK_REQUEST.body = originalBody;
			});

			describe('and job generated', () => {
				const EXPECTED_STATUS_CODE = 204;
				beforeAll(async () => {
					MOCK_GENERATE_JOB.mockResolvedValue(true);
					await jobGeneratorHandler(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT);
				});

				afterAll(() => {
					MOCK_GENERATE_JOB.mockReset();
					MOCK_RESPONSE_SEND_STATUS.mockClear();
				});

				it('calls .generateJob with expected argument', () => {
					expect(MOCK_GENERATE_JOB).toHaveBeenCalledTimes(1);
					expect(MOCK_GENERATE_JOB).toHaveBeenCalledWith(expectedMessage);
				});

				it('calls Response.sendStatus method once with expected argument', () => {
					expect(MOCK_RESPONSE_SEND_STATUS).toHaveBeenCalledTimes(1);
					expect(MOCK_RESPONSE_SEND_STATUS).toHaveBeenCalledWith(EXPECTED_STATUS_CODE);
				});
			});

			describe('and job not generated', () => {
				const EXPECTED_STATUS_CODE = 506;
				beforeAll(async () => {
					MOCK_GENERATE_JOB.mockResolvedValue(false);
					await jobGeneratorHandler(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT);
				});

				afterAll(() => {
					MOCK_GENERATE_JOB.mockReset();
					MOCK_RESPONSE_SEND_STATUS.mockClear();
				});

				it('calls .generateJob with expected argument', () => {
					expect(MOCK_GENERATE_JOB).toHaveBeenCalledTimes(1);
					expect(MOCK_GENERATE_JOB).toHaveBeenCalledWith(expectedMessage);
				});

				it('calls Response.sendStatus method once with expected argument', () => {
					expect(MOCK_RESPONSE_SEND_STATUS).toHaveBeenCalledTimes(1);
					expect(MOCK_RESPONSE_SEND_STATUS).toHaveBeenCalledWith(EXPECTED_STATUS_CODE);
				});
			});
		});
	});
});
