import amqplib from 'amqplib';
import { Request } from 'express';
import { createJobGeneratorHandler, createQueueChannel } from './job-generator-handler';
import { createMockExpressResponse } from '../mocks/express';
import {
	MOCK_ASSERT_EXCHANGE,
	MOCK_ASSERT_QUEUE,
	MOCK_BIND_QUEUE,
	MOCK_PUBLISH,
	createMockQueueChannel,
} from '../mocks/queue';

const MOCK_URL = 'amqp://localhost:5673';
const MOCK_MESSAGE = 'MOCK MESSAGE';
const ORIGINAL_ENV = process.env;

const MOCK_REQUEST = {
	body: {
		message: MOCK_MESSAGE,
	},
} as Request<Record<string, never>, string>;
const req = MOCK_REQUEST;
const MOCK_CREATE_QUEUE_CHANNEL = createMockQueueChannel();
const res = createMockExpressResponse();
const next = jest.fn();

jest.mock('amqplib', () => ({
	connect: jest.fn().mockResolvedValue({
		createChannel: jest.fn(),
	}),
}));
const MOCK_AMQPLIB_CONNECT = amqplib.connect as jest.Mock;

describe('.createQueueChannel', () => {
	describe('when called', () => {
		beforeAll(async () => {
			await createQueueChannel(MOCK_URL);
		});

		afterAll(() => {
			MOCK_AMQPLIB_CONNECT.mockClear();
		});

		it('connect is called once', () => {
			expect(MOCK_AMQPLIB_CONNECT).toHaveBeenCalledTimes(1);
		});

		it('connect is called with correct parameters', () => {
			expect(MOCK_AMQPLIB_CONNECT).toHaveBeenCalledWith(MOCK_URL, 'heartbeat=60');
		});
	});
});

describe('.createJobGeneratorHandler', () => {
	beforeAll(() => {
		process.env = {
			AMQP_URL: MOCK_URL,
		};
	});

	afterAll(() => {
		process.env = ORIGINAL_ENV;
	});

	describe('when called', () => {
		describe('when AMQP server available', () => {
			const MOCK_QUEUE = 'DEMOQUEUE';
			const MOCK_EXCHANGE = 'QUEUE_ACTION';
			const MOCK_ROUTING_KEY = 'QUEUE_KEY';
			const message = req.body.message;

			beforeAll(async () => {
				MOCK_AMQPLIB_CONNECT.mockResolvedValue({
					createChannel: MOCK_CREATE_QUEUE_CHANNEL,
				});
				createJobGeneratorHandler()(req, res, next);
			});

			afterAll(() => {
				MOCK_AMQPLIB_CONNECT.mockReset();
			});

			it('assertExchange was called with correct arguments', () => {
				expect(MOCK_ASSERT_EXCHANGE).toHaveBeenCalledWith(MOCK_EXCHANGE, 'direct', {
					durable: true,
				});
			});

			it('assertQueue was called with correct arguments', () => {
				expect(MOCK_ASSERT_QUEUE).toHaveBeenCalledWith(MOCK_QUEUE, { durable: true });
			});

			it('bindQueue was called with correct arguments', () => {
				expect(MOCK_BIND_QUEUE).toHaveBeenCalledWith(MOCK_QUEUE, MOCK_EXCHANGE, MOCK_ROUTING_KEY);
			});

			it('publish was called with correct arguments', () => {
				expect(MOCK_PUBLISH).toHaveBeenCalledWith(
					MOCK_EXCHANGE,
					MOCK_ROUTING_KEY,
					Buffer.from(JSON.stringify(message))
				);
			});

			it('should publish the message', async () => {
				expect(res.status).toHaveBeenCalledWith(200);
				expect(res.send).toHaveBeenCalledWith('Message published');
			});
		});

		describe('when connection fails', () => {
			beforeAll(async () => {
				MOCK_AMQPLIB_CONNECT.mockRejectedValue(new Error());
				createJobGeneratorHandler()(req, res, next);
			});

			afterAll(() => {
				MOCK_AMQPLIB_CONNECT.mockRestore();
			});

			it('sends expected response', async () => {
				expect(res.status).toHaveBeenCalledWith(500);
				expect(res.send).toHaveBeenCalledWith('Unable to publish message to queue');
			});
		});

		describe('invalid environment', () => {
			beforeAll(() => {
				process.env = {};
			});

			afterAll(() => {
				process.env = ORIGINAL_ENV;
			});

			it('should throw an error', async () => {
				expect(await createJobGeneratorHandler).toThrow(
					'[Invalid environment] Variable not found: AMQP_URL'
				);
			});
		});
	});
});
