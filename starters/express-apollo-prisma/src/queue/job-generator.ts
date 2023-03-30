import { Connection, Channel, connect } from 'amqplib';
import { AMQP_QUEUE_JOB, AMQP_URL } from '../config';

export const generateJob = async (message: string): Promise<boolean> => {
	let success: boolean;

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
