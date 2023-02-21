import { Request, RequestHandler, Response } from 'express';
import amqplib from 'amqplib';

export const createJobGeneratorHandler = (): RequestHandler<Record<string, never>, string> => {
        const AMQP_URL = process.env.AMQP_URL;
        if (!AMQP_URL) {
	        throw new Error(`[Invalid environment] Variable not found: AMQP_URL`);
        }
	const queueChannelPromise = createQueueChannel(AMQP_URL);

	return async (req: Request, res: Response) => {
		try {
			const queue = 'DEMOQUEUE';
			const exchange = 'QUEUE_ACTION';
			const routingKey = 'QUEUE_KEY';

			const queueChannel = await queueChannelPromise;
			await queueChannel.assertExchange(exchange, 'direct', { durable: true });
			await queueChannel.assertQueue(queue, { durable: true });
			await queueChannel.bindQueue(queue, exchange, routingKey);

			const { message } = req.body;
			queueChannel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
			res.status(200).send('Message published');
		} catch (e) {
			res.status(500).send('Unable to publish message to queue');
		}
	};
};

const createQueueChannel = async (amqpUrl: string) => {
	const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
	const channel = await connection.createChannel();
	return channel;
};
