import amqplib from 'amqplib';
import * as dotenv from 'dotenv';
import { AMQP_QUEUE_JOB, AMQP_URL } from '../config';

dotenv.config();

(async () => {
	const connection = await amqplib.connect(AMQP_URL);

	const channel = await connection.createChannel();
	await channel.assertQueue(AMQP_QUEUE_JOB);

	// Listener
	channel.consume(AMQP_QUEUE_JOB, (message) => {
		if (message) {
			console.log('Recieved:', message.content.toString());
			channel.ack(message);
		} else {
			console.log('Worker cancelled by server');
		}
	});

	process.on('SIGINT', async () => {
		await channel.close();
		await connection.close();
		console.log('[AMQP Connection closed]');
		process.exit(0); // if you don't close yourself this will run forever
	});

	console.log(`Listening queue: "${AMQP_QUEUE_JOB}" ...`);
})();
