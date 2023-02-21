import amqplib from 'amqplib';
import { createJobGeneratorHandler } from './job-generator-handler';

const MOCK_URL = 'amqp://localhost:5673';

const SPY_AMQPLIB_CONNECT = jest.spyOn(amqplib, 'connect');

describe('.createJobGeneratorHandler', () => {
	let req: any;
	let res: any;
	let mockCreateQueueChannel: any;
	const next = jest.fn();
	const OLD_ENV = process.env;

	beforeAll(() => {
		req = {
			body: {
				message: 'job message',
			},
		};
		res = {
			send: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};
		process.env = {
			AMQP_URL: MOCK_URL,
		};
	});

	afterAll(() => {
		process.env = OLD_ENV;
	});

	describe('when ampqlib works properly', () => {
		beforeAll(() => {
			mockCreateQueueChannel = jest.fn(() =>
				Promise.resolve({
					assertExchange: jest.fn(),
					assertQueue: jest.fn(),
					bindQueue: jest.fn(),
					publish: jest.fn(),
				})
			);

			SPY_AMQPLIB_CONNECT.mockResolvedValue({ createChannel: mockCreateQueueChannel } as any);
		});

		afterAll(() => {
			SPY_AMQPLIB_CONNECT.mockRestore();
		});

		it('should create a queue channel and publish the message', async () => {
			await createJobGeneratorHandler()(req, res, next);

			expect(amqplib.connect).toHaveBeenCalledWith(MOCK_URL, 'heartbeat=60');
			expect(mockCreateQueueChannel).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Message published');
		});
	});

	describe('when connection fails', () => {
		beforeAll(() => {
			SPY_AMQPLIB_CONNECT.mockRejectedValue(new Error('error'));
		});

		afterAll(() => {
			SPY_AMQPLIB_CONNECT.mockRestore();
		});
		it('should return a 500 status when an error occurs', async () => {
			await createJobGeneratorHandler()(req, res, next);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.send).toHaveBeenCalledWith('Unable to publish message to queue');
		});
	});

	describe('invalid environment', () => {
		beforeAll(() => {
			process.env = {};
		});

		afterAll(() => {
			process.env = OLD_ENV;
		});

		it('should throw an error', async () => {
			expect(await createJobGeneratorHandler).toThrow(
				`[Invalid environment] Variable not found: AMQP_URL`
			);
		});
	});
});
