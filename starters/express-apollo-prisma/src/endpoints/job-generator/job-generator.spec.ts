import { connect, Replies } from 'amqplib';
import { createMockChannel, createMockConnection } from '../../mocks/amqplib';
import { generateJob } from './job-generator';

const MOCK_MESSAGE = 'MOCK_MESSAGE';
const MOCK_ENV_AMQP_URL = 'MOCK_AMQP_URL';
const MOCK_ENV_AMQP_QUEUE_JOB = 'MOCK_ENV_AMQP_QUEUE_JOB';

const MOCK_AMQP_CONNECTION = createMockConnection();
const MOCK_AMPQ_CHANNEL = createMockChannel();

const MOCK_REPLY_ASSERT_QUEUE: Replies.AssertQueue = {
	queue: 'MOCK_QUEUE',
	messageCount: 1,
	consumerCount: 2,
};

jest.mock('amqplib', () => ({
	connect: jest.fn(),
}));

const MOCK_AMQP_CONNECT = connect as jest.MockedFn<typeof connect>;
const SPY_CONSOLE_WARN = jest.spyOn(console, 'warn');

describe('.generateJob', () => {
	const OROGINAL_ENV = process.env;
	beforeAll(() => {
		SPY_CONSOLE_WARN.mockImplementation(jest.fn());
	});

	afterAll(() => {
		SPY_CONSOLE_WARN.mockRestore();
		process.env = OROGINAL_ENV;
	});

	describe('when called with message', () => {
		describe('and environment variable AMQP_URL not set', () => {
			const REPRODUCER_FN = async () => {
				await generateJob(MOCK_MESSAGE);
			};

			beforeAll(async () => {
				process.env = {};
			});

			it('throws expected error', async () => {
				await expect(REPRODUCER_FN).rejects.toThrowError(
					'[Invalid environment] Variable not found: AMQP_URL'
				);
			});
		});

		describe('and environment variable AMQP_QUEUE_JOB not set', () => {
			const REPRODUCER_FN = async () => {
				await generateJob(MOCK_MESSAGE);
			};

			beforeAll(() => {
				process.env = {
					AMQP_URL: MOCK_ENV_AMQP_URL,
				};
			});

			it('throws expected error', async () => {
				await expect(REPRODUCER_FN).rejects.toThrowError(
					'[Invalid environment] Variable not found: AMQP_QUEUE_JOB'
				);
			});
		});

		describe('and environment variables set', () => {
			const MOCK_INSTANCE_ERROR = new Error();

			type ExpectedFlow = {
				createsChannel: boolean;
				assertsQueue: boolean;
				sendsMessageToQueue: boolean;
				logsWarning: boolean;
				closesChannel: boolean;
				closesConnection: boolean;
			};

			describe.each([
				[
					'AMQP server is unavailable',
					MOCK_INSTANCE_ERROR,
					MOCK_AMPQ_CHANNEL,
					MOCK_REPLY_ASSERT_QUEUE,
					true,
					{
						createsChannel: false,
						assertsQueue: false,
						sendsMessageToQueue: false,
						logsWarning: true,
						closesChannel: false,
						closesConnection: false,
					},
					false,
				],
				[
					'AMQP server is available, but unable to create channel',
					MOCK_AMQP_CONNECTION,
					MOCK_INSTANCE_ERROR,
					MOCK_REPLY_ASSERT_QUEUE,
					true,
					{
						createsChannel: true,
						assertsQueue: false,
						sendsMessageToQueue: false,
						logsWarning: true,
						closesChannel: false,
						closesConnection: true,
					},
					false,
				],
				[
					'AMQP server is available, channel created, but error occured on asserting queue step',
					MOCK_AMQP_CONNECTION,
					MOCK_AMPQ_CHANNEL,
					MOCK_INSTANCE_ERROR,
					true,
					{
						createsChannel: true,
						assertsQueue: true,
						sendsMessageToQueue: false,
						logsWarning: true,
						closesChannel: true,
						closesConnection: true,
					},
					false,
				],
				[
					'AMQP server is available, channel created, queue asserted successfully, but message not sent',
					MOCK_AMQP_CONNECTION,
					MOCK_AMPQ_CHANNEL,
					MOCK_REPLY_ASSERT_QUEUE,
					false,
					{
						createsChannel: true,
						assertsQueue: true,
						sendsMessageToQueue: true,
						logsWarning: false,
						closesChannel: true,
						closesConnection: true,
					},
					false,
				],
				[
					'AMQP server is available, channel created, queue asserted successfully, message sent successfully',
					MOCK_AMQP_CONNECTION,
					MOCK_AMPQ_CHANNEL,
					MOCK_REPLY_ASSERT_QUEUE,
					true,
					{
						createsChannel: true,
						assertsQueue: true,
						sendsMessageToQueue: true,
						logsWarning: false,
						closesChannel: true,
						closesConnection: true,
					},
					true,
				],
			])(
				'and %s',
				(
					_statement,
					mockAMPQConnectResult,
					mockConnectionCreateChannelResult,
					mockChannelAssertQueueResult,
					mockChannelSendToQueueResult,
					expectedFlow: ExpectedFlow,
					expectedResult
				) => {
					let result: boolean;

					beforeAll(async () => {
						process.env = {
							AMQP_URL: MOCK_ENV_AMQP_URL,
							AMQP_QUEUE_JOB: MOCK_ENV_AMQP_QUEUE_JOB,
						};
						mockAwaitedResultValue(MOCK_AMQP_CONNECT, mockAMPQConnectResult);
						mockAwaitedResultValue(
							MOCK_AMQP_CONNECTION.createChannel,
							mockConnectionCreateChannelResult
						);
						mockAwaitedResultValue(MOCK_AMPQ_CHANNEL.assertQueue, mockChannelAssertQueueResult);
						MOCK_AMPQ_CHANNEL.sendToQueue.mockReturnValue(mockChannelSendToQueueResult);
						result = await generateJob(MOCK_MESSAGE);
					});

					afterAll(() => {
						MOCK_AMQP_CONNECT.mockReset();
						MOCK_AMQP_CONNECTION.createChannel.mockReset();
						MOCK_AMPQ_CHANNEL.assertQueue.mockReset();
						MOCK_AMPQ_CHANNEL.sendToQueue.mockReset();

						MOCK_AMPQ_CHANNEL.close.mockClear();
						MOCK_AMQP_CONNECTION.close.mockClear();
						SPY_CONSOLE_WARN.mockClear();
					});

					it('calls amqplib.connect method once with expected argument', () => {
						expect(MOCK_AMQP_CONNECT).toHaveBeenCalledTimes(1);
						expect(MOCK_AMQP_CONNECT).toHaveBeenCalledWith(MOCK_ENV_AMQP_URL);
					});

					expectedFlow.createsChannel &&
						it('calls Connection.createChannel method once', () => {
							expect(MOCK_AMQP_CONNECTION.createChannel).toHaveBeenCalledTimes(1);
						});

					expectedFlow.assertsQueue &&
						it('calls Channel.assertQueue method once with expected argument', () => {
							expect(MOCK_AMPQ_CHANNEL.assertQueue).toHaveBeenCalledTimes(1);
							expect(MOCK_AMPQ_CHANNEL.assertQueue).toHaveBeenCalledWith(MOCK_ENV_AMQP_QUEUE_JOB);
						});

					expectedFlow.sendsMessageToQueue &&
						it('calls Channel.sendToQueue method once with expected arguments', () => {
							expect(MOCK_AMPQ_CHANNEL.sendToQueue).toHaveBeenCalledTimes(1);
							const expectedBuffer = Buffer.from(MOCK_MESSAGE);
							expect(MOCK_AMPQ_CHANNEL.sendToQueue).toHaveBeenCalledWith(
								MOCK_ENV_AMQP_QUEUE_JOB,
								expectedBuffer,
								{
									persistent: true,
								}
							);
						});

					expectedFlow.logsWarning &&
						it('logs expected warning', () => {
							expect(SPY_CONSOLE_WARN).toHaveBeenCalledTimes(1);
							expect(SPY_CONSOLE_WARN).toHaveBeenCalledWith(
								'[Job Generator] Error occured:',
								MOCK_INSTANCE_ERROR
							);
						});

					expectedFlow.closesChannel &&
						it('closes AMQP channel', () => {
							expect(MOCK_AMPQ_CHANNEL.close).toHaveBeenCalledTimes(1);
						});

					expectedFlow.closesConnection &&
						it('closes AMQP connection', () => {
							expect(MOCK_AMQP_CONNECTION.close).toHaveBeenCalledTimes(1);
						});

					it('returns expected result', () => {
						expect(result).toStrictEqual(expectedResult);
					});
				}
			);
		});
	});
});

function mockAwaitedResultValue<TMockedFn extends jest.Mock>(
	mockedFn: TMockedFn,
	resultValue: Awaited<ReturnType<TMockedFn>> | Error
) {
	if (resultValue instanceof Error) {
		mockedFn.mockRejectedValue(resultValue);
	} else {
		mockedFn.mockResolvedValue(resultValue);
	}
}
