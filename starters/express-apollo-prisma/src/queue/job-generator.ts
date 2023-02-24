import { Connection, Channel, connect } from 'amqplib';

export const generateJob = async (message: string): Promise<boolean> => {
	let success: boolean;
	const AMQP_URL = process.env.AMQP_URL;
	if (!AMQP_URL) {
		throw new Error('[Invalid environment] Variable not found: AMQP_URL');
	}

	const AMQP_QUEUE_JOB = process.env.AMQP_QUEUE_JOB;
	if (!AMQP_QUEUE_JOB) {
		throw new Error('[Invalid environment] Variable not found: AMQP_QUEUE_JOB');
	}

	let connection: Connection | undefined;
	let channel: Channel | undefined;
	try {
		connection = await connect(AMQP_URL);
		channel = await connection.createChannel();
		await channel.assertQueue(AMQP_QUEUE_JOB);
		success = channel.sendToQueue(AMQP_QUEUE_JOB, Buffer.from(message), {
			persistent: true,
		});
	} catch (error: unknown) {
		console.warn('[Job Generator] Error occured:', error);
		success = false;
	} finally {
		await channel?.close();
		await connection?.close();
	}
	return success;
};
