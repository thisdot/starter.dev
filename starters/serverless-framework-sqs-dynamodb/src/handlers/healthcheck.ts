import type { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (/* _event, _context */) => {
	return {
		statusCode: 200,
		body: 'public-api is working!',
	};
};
