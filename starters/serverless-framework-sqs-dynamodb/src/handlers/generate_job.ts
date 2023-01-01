import type { APIGatewayProxyHandler } from 'aws-lambda';
import { sendMessage } from '@/utils/sqs/sendMessage';

export const handler: APIGatewayProxyHandler = async () => {
	const resp = await sendMessage('ExampleQueue', {
		id: Math.ceil(Math.random() * 100),
		message: 'Hello World!',
	});

	return {
		statusCode: resp.success ? 201 : 400,
		body: JSON.stringify(resp.data),
	};
};
