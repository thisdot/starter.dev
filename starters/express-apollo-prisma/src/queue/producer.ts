import { Request, RequestHandler, Response } from 'express';
import amqplib from 'amqplib';

export const createJobGenerator = ({
	queueChannel,
}: {
	queueChannel: amqplib.Channel;
}): RequestHandler<Record<string, never>, string> => {
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

export const createQueueChannel = async (amqpUrl: string) => {
	const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
	const channel = await connection.createChannel();
	return channel;
};
