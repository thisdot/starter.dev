import { connect } from 'amqplib';
import { createMockChannel, createMockConnection } from '../mocks/amqplib';
import { generateJob } from './job-generator';

const MOCK_MESSAGE = 'MOCK_MESSAGE';
const MOCK_ENV_AMQP_URL = 'MOCK_AMQP_URL';
const MOCK_ENV_AMQP_QUEUE_JOB = 'MOCK_ENV_AMQP_QUEUE_JOB';

const MOCK_AMQP_CONNECTION = createMockConnection();
const MOCK_AMPQ_CHANNEL = createMockChannel();

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
			describe('and AMQP server is unavailable', () => {
				const MOCK_INSTANCE_ERROR = new Error();
				let result: boolean;

				beforeAll(async () => {
					process.env = {
						AMQP_URL: MOCK_ENV_AMQP_URL,
						AMQP_QUEUE_JOB: MOCK_ENV_AMQP_QUEUE_JOB,
					};
					MOCK_AMQP_CONNECT.mockRejectedValue(MOCK_INSTANCE_ERROR);
					result = await generateJob(MOCK_MESSAGE);
				});

				afterAll(() => {
					MOCK_AMQP_CONNECT.mockReset();
					SPY_CONSOLE_WARN.mockClear();
				});

				it('calls amqplib.connect method once with expected argument', () => {
					expect(MOCK_AMQP_CONNECT).toHaveBeenCalledTimes(1);
					expect(MOCK_AMQP_CONNECT).toHaveBeenCalledWith(MOCK_ENV_AMQP_URL);
				});

				it('logs expected warning', () => {
					expect(SPY_CONSOLE_WARN).toHaveBeenCalledTimes(1);
					expect(SPY_CONSOLE_WARN).toHaveBeenCalledWith(
						'[Job Generator] Error occured:',
						MOCK_INSTANCE_ERROR
					);
				});

				it('returns expected result', () => {
					expect(result).toStrictEqual(false);
				});
			});

			describe('and AMQP server is available, but unable to create channel', () => {
				const MOCK_INSTANCE_ERROR = new Error();
				let result: boolean;

				beforeAll(async () => {
					process.env = {
						AMQP_URL: MOCK_ENV_AMQP_URL,
						AMQP_QUEUE_JOB: MOCK_ENV_AMQP_QUEUE_JOB,
					};
					MOCK_AMQP_CONNECTION.createChannel.mockRejectedValue(MOCK_INSTANCE_ERROR);
					MOCK_AMQP_CONNECT.mockResolvedValue(MOCK_AMQP_CONNECTION);
					result = await generateJob(MOCK_MESSAGE);
				});

				afterAll(() => {
					MOCK_AMQP_CONNECT.mockReset();
					MOCK_AMQP_CONNECTION.createChannel.mockReset();
					MOCK_AMQP_CONNECTION.close.mockClear();
					SPY_CONSOLE_WARN.mockClear();
				});

				it('calls amqplib.connect method once with expected argument', () => {
					expect(MOCK_AMQP_CONNECT).toHaveBeenCalledTimes(1);
					expect(MOCK_AMQP_CONNECT).toHaveBeenCalledWith(MOCK_ENV_AMQP_URL);
				});

				it('calls Connection.createChannel method once', () => {
					expect(MOCK_AMQP_CONNECTION.createChannel).toHaveBeenCalledTimes(1);
				});

				it('logs expected warning', () => {
					expect(SPY_CONSOLE_WARN).toHaveBeenCalledTimes(1);
					expect(SPY_CONSOLE_WARN).toHaveBeenCalledWith(
						'[Job Generator] Error occured:',
						MOCK_INSTANCE_ERROR
					);
				});

				it('closes AMQP connection', () => {
					expect(MOCK_AMQP_CONNECTION.close).toHaveBeenCalledTimes(1);
				});

				it('returns expected result', () => {
					expect(result).toStrictEqual(false);
				});
			});

			describe('and AMQP server is available, channel created, but error occured on asserting queue step', () => {
				const MOCK_INSTANCE_ERROR = new Error();
				let result: boolean;

				beforeAll(async () => {
					process.env = {
						AMQP_URL: MOCK_ENV_AMQP_URL,
						AMQP_QUEUE_JOB: MOCK_ENV_AMQP_QUEUE_JOB,
					};
					MOCK_AMQP_CONNECT.mockResolvedValue(MOCK_AMQP_CONNECTION);
					MOCK_AMQP_CONNECTION.createChannel.mockResolvedValue(MOCK_AMPQ_CHANNEL);
					MOCK_AMPQ_CHANNEL.assertQueue.mockRejectedValue(MOCK_INSTANCE_ERROR);
					result = await generateJob(MOCK_MESSAGE);
				});

				afterAll(() => {
					MOCK_AMQP_CONNECT.mockReset();
					MOCK_AMQP_CONNECTION.createChannel.mockReset();
					MOCK_AMPQ_CHANNEL.assertQueue.mockReset();
					MOCK_AMPQ_CHANNEL.close.mockClear();
					MOCK_AMQP_CONNECTION.close.mockClear();
					SPY_CONSOLE_WARN.mockClear();
				});

				it('calls amqplib.connect method once with expected argument', () => {
					expect(MOCK_AMQP_CONNECT).toHaveBeenCalledTimes(1);
					expect(MOCK_AMQP_CONNECT).toHaveBeenCalledWith(MOCK_ENV_AMQP_URL);
				});

				it('calls Conenction.createChannel method once', () => {
					expect(MOCK_AMQP_CONNECTION.createChannel).toHaveBeenCalledTimes(1);
				});

				it('calls Channel.assertQueue method once with expected argument', () => {
					expect(MOCK_AMPQ_CHANNEL.assertQueue).toHaveBeenCalledTimes(1);
					expect(MOCK_AMPQ_CHANNEL.assertQueue).toHaveBeenCalledWith(MOCK_ENV_AMQP_QUEUE_JOB);
				});

				it('logs expected warning', () => {
					expect(SPY_CONSOLE_WARN).toHaveBeenCalledTimes(1);
					expect(SPY_CONSOLE_WARN).toHaveBeenCalledWith(
						'[Job Generator] Error occured:',
						MOCK_INSTANCE_ERROR
					);
				});

				it('closes AMQP channel', () => {
					expect(MOCK_AMPQ_CHANNEL.close).toHaveBeenCalledTimes(1);
				});

				it('closes AMQP connection', () => {
					expect(MOCK_AMQP_CONNECTION.close).toHaveBeenCalledTimes(1);
				});

				it('returns expected result', () => {
					expect(result).toStrictEqual(false);
				});
			});

			describe('and AMQP server is available, channel created, queue asserted successfully, but message not sent', () => {
				let result: boolean;

				beforeAll(async () => {
					process.env = {
						AMQP_URL: MOCK_ENV_AMQP_URL,
						AMQP_QUEUE_JOB: MOCK_ENV_AMQP_QUEUE_JOB,
					};
					MOCK_AMPQ_CHANNEL.sendToQueue.mockReturnValue(false);
					MOCK_AMQP_CONNECT.mockResolvedValue(MOCK_AMQP_CONNECTION);
					MOCK_AMQP_CONNECTION.createChannel.mockResolvedValue(MOCK_AMPQ_CHANNEL);
					result = await generateJob(MOCK_MESSAGE);
				});

				afterAll(() => {
					MOCK_AMQP_CONNECT.mockReset();
					MOCK_AMPQ_CHANNEL.sendToQueue.mockReset();
					MOCK_AMPQ_CHANNEL.assertQueue.mockClear();
					MOCK_AMQP_CONNECTION.createChannel.mockReset();
					MOCK_AMPQ_CHANNEL.close.mockClear();
					MOCK_AMQP_CONNECTION.close.mockClear();
					SPY_CONSOLE_WARN.mockClear();
				});

				it('calls amqplib.connect method once with expected argument', () => {
					expect(MOCK_AMQP_CONNECT).toHaveBeenCalledTimes(1);
					expect(MOCK_AMQP_CONNECT).toHaveBeenCalledWith(MOCK_ENV_AMQP_URL);
				});

				it('calls Conenction.createChannel method once', () => {
					expect(MOCK_AMQP_CONNECTION.createChannel).toHaveBeenCalledTimes(1);
				});

				it('calls Channel.assertQueue method once with expected argument', () => {
					expect(MOCK_AMPQ_CHANNEL.assertQueue).toHaveBeenCalledTimes(1);
					expect(MOCK_AMPQ_CHANNEL.assertQueue).toHaveBeenCalledWith(MOCK_ENV_AMQP_QUEUE_JOB);
				});

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

				it('closes AMQP channel', () => {
					expect(MOCK_AMPQ_CHANNEL.close).toHaveBeenCalledTimes(1);
				});

				it('closes AMQP connection', () => {
					expect(MOCK_AMQP_CONNECTION.close).toHaveBeenCalledTimes(1);
				});

				it('returns expected result', () => {
					expect(result).toStrictEqual(false);
				});
			});

			describe('and AMQP server is available, channel created, queue asserted successfully, message sent successfully', () => {
				let result: boolean;

				beforeAll(async () => {
					process.env = {
						AMQP_URL: MOCK_ENV_AMQP_URL,
						AMQP_QUEUE_JOB: MOCK_ENV_AMQP_QUEUE_JOB,
					};
					MOCK_AMPQ_CHANNEL.sendToQueue.mockReturnValue(true);
					MOCK_AMQP_CONNECT.mockResolvedValue(MOCK_AMQP_CONNECTION);
					MOCK_AMQP_CONNECTION.createChannel.mockResolvedValue(MOCK_AMPQ_CHANNEL);
					result = await generateJob(MOCK_MESSAGE);
				});

				afterAll(() => {
					MOCK_AMPQ_CHANNEL.sendToQueue.mockReset();
					MOCK_AMPQ_CHANNEL.assertQueue.mockClear();
					MOCK_AMQP_CONNECTION.createChannel.mockReset();
					MOCK_AMPQ_CHANNEL.close.mockClear();
					MOCK_AMQP_CONNECTION.close.mockClear();
					MOCK_AMQP_CONNECT.mockReset();
					SPY_CONSOLE_WARN.mockClear();
				});

				it('calls amqplib.connect method once with expected argument', () => {
					expect(MOCK_AMQP_CONNECT).toHaveBeenCalledTimes(1);
					expect(MOCK_AMQP_CONNECT).toHaveBeenCalledWith(MOCK_ENV_AMQP_URL);
				});

				it('calls Conenction.createChannel method once', () => {
					expect(MOCK_AMQP_CONNECTION.createChannel).toHaveBeenCalledTimes(1);
				});

				it('calls Channel.assertQueue method once with expected argument', () => {
					expect(MOCK_AMPQ_CHANNEL.assertQueue).toHaveBeenCalledTimes(1);
					expect(MOCK_AMPQ_CHANNEL.assertQueue).toHaveBeenCalledWith(MOCK_ENV_AMQP_QUEUE_JOB);
				});

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

				it('closes AMQP channel', () => {
					expect(MOCK_AMPQ_CHANNEL.close).toHaveBeenCalledTimes(1);
				});

				it('closes AMQP connection', () => {
					expect(MOCK_AMQP_CONNECTION.close).toHaveBeenCalledTimes(1);
				});

				it('returns expected result', () => {
					expect(result).toStrictEqual(true);
				});
			});
		});
	});
});
