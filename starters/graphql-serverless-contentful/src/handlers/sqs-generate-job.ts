import { APIGatewayProxyHandler } from 'aws-lambda';
import { sendMessage } from '../utils/sqs';

export const handler: APIGatewayProxyHandler = async () => {
	console.log('API call');
	const resp = await sendMessage({
		id: Math.ceil(Math.random() * 100),
		message: 'Hello World!',
	});

	return {
		statusCode: resp.success ? 200 : 400,
		body: JSON.stringify(resp.data),
	};
};
