import amqplib from 'amqplib';
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5673';

async function processMessage(msg: amqplib.ConsumeMessage) {
	console.log('Job Message:', msg.content.toString());
	// your code here
}

(async () => {
	const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
	const channel = await connection.createChannel();
	channel.prefetch(10);
	const queue = 'DEMOQUEUE';
	process.once('SIGINT', async () => {
		await channel.close();
		await connection.close();
		process.exit(0);
	});

	await channel.assertQueue(queue, { durable: true });
	await channel.consume(
		queue,
		async (msg) => {
			if (!msg) return;
			console.log('Processing messages');
			await processMessage(msg);
			channel.ack(msg);
		},
		{
			noAck: false,
			consumerTag: 'demo_queue_worker',
		}
	);
	console.log(' [*] Waiting for messages. To exit press CTRL+C');
})();
