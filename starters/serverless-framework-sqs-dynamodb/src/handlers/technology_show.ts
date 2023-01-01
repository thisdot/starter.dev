import type { APIGatewayProxyHandler } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { get as getTechnology } from '@/models/technology/get';
import { responseHelper } from '@/utils/responseHelper/responseHelper';
import { getErrorMessage } from '@/utils/error/getErrorMessage';

export const handler: APIGatewayProxyHandler = async (event) => {
	const id = event.pathParameters?.id;
	if (!id) {
		return responseHelper(StatusCodes.BAD_REQUEST, 'Bad Request: no id provided');
	}

	try {
		const technology = await getTechnology(id);
		if (!technology) {
			return responseHelper(StatusCodes.NOT_FOUND, null);
		}
		return responseHelper(StatusCodes.OK, technology);
	} catch (err) {
		console.error(err);
		return responseHelper(
			StatusCodes.INTERNAL_SERVER_ERROR,
			`Server Error: ${getErrorMessage(err)}`
		);
	}
};
