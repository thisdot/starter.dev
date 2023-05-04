import { APIGatewayProxyHandler } from 'aws-lambda';
import { sendMessage } from '../utils/sqs';

export const handler: APIGatewayProxyHandler = async (event) => {
	const body = JSON.parse(event.body || '{}');
	const resp = await sendMessage({
		id: Math.ceil(Math.random() * 100),
		message: body.message,
	});

	return {
		statusCode: resp.success ? 200 : 400,
		body: JSON.stringify(resp.data),
	};
};
