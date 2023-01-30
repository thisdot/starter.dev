import type { APIGatewayProxyHandler } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { sendMessage } from '@/utils/sqs/sendMessage';

export const handler: APIGatewayProxyHandler = async () => {
	const resp = await sendMessage('ExampleQueue', {
		id: Math.ceil(Math.random() * 100),
		message: 'Hello World!',
	});

	return {
		statusCode: resp.success ? StatusCodes.CREATED : StatusCodes.BAD_REQUEST,
		body: JSON.stringify(resp.data),
	};
};
