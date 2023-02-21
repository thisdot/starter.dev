import { Request, RequestHandler, Response } from 'express';
import amqplib from 'amqplib';

// rename the function for readability and clarity
export const createJobGeneratorHandler = (): RequestHandler<Record<string, never>, string> => {
       // use [SNIPPET#1] here + create channel here (before return)
	return async (req: Request, res: Response) => {
		try {
			const queue = 'DEMOQUEUE';
			const exchange = 'QUEUE_ACTION';
			const routingKey = 'QUEUE_KEY';

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

// remove export. it should be encapsulated here to make the Queueing feature optional
const createQueueChannel = async (amqpUrl: string) => {
	const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
	const channel = await connection.createChannel();
	return channel;
};
