import { createMockExpressRequest, createMockExpressResponse } from '../../mocks/express';
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

const MOCK_NEXT_DELEGATE = jest.fn();

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

			describe.each([
				['job generated', true, 204],
				['job not generated', false, 506],
			])('and %s', (_statement, mockGenerateJobResult, expectedStatusCode) => {
				beforeAll(async () => {
					MOCK_GENERATE_JOB.mockResolvedValue(mockGenerateJobResult);
					await jobGeneratorHandler(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_DELEGATE);
				});

				afterAll(() => {
					MOCK_GENERATE_JOB.mockReset();
					MOCK_RESPONSE.sendStatus.mockClear();
				});

				it('calls .generateJob with expected argument', () => {
					expect(MOCK_GENERATE_JOB).toHaveBeenCalledTimes(1);
					expect(MOCK_GENERATE_JOB).toHaveBeenCalledWith(expectedMessage);
				});

				it('calls Response.sendStatus method once with expected argument', () => {
					expect(MOCK_RESPONSE.sendStatus).toHaveBeenCalledTimes(1);
					expect(MOCK_RESPONSE.sendStatus).toHaveBeenCalledWith(expectedStatusCode);
				});
			});
		});
	});
});
