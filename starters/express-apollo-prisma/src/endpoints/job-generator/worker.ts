import amqplib from 'amqplib';
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {
	const AMQP_URL = process.env.AMQP_URL;
	if (!AMQP_URL) {
		throw new Error(`[Invalid environment] Variable not found: AMQP_URL`);
	}

	const AMQP_QUEUE_JOB = process.env.AMQP_QUEUE_JOB;
	if (!AMQP_QUEUE_JOB) {
		throw new Error(`[Invalid environment] Variable not found: AMQP_QUEUE_JOB`);
	}

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
