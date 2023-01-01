import type { APIGatewayProxyHandler } from 'aws-lambda';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { TechnologyUpdateSchema } from '@/types/technology';
import { update as updateTechnology } from '@/models/technology/update';
import { responseHelper } from '@/utils/responseHelper/responseHelper';
import { getErrorMessage } from '@/utils/error/getErrorMessage';

export const handler: APIGatewayProxyHandler = async (event) => {
	const id = event.pathParameters?.id;
	if (!id) {
		return responseHelper(StatusCodes.BAD_REQUEST, 'Bad Request: no id provided');
	}

	try {
		const payload = event.body ? JSON.parse(event.body) : null;
		TechnologyUpdateSchema.parse(payload);
		const technology = await updateTechnology(id, payload);
		if (!technology) {
			return responseHelper(StatusCodes.NOT_FOUND, null);
		}

		return responseHelper(StatusCodes.OK, technology);
	} catch (err) {
		console.error(err);
		if (err instanceof ZodError) {
			return responseHelper(StatusCodes.BAD_REQUEST, err.flatten());
		}
		return responseHelper(
			StatusCodes.INTERNAL_SERVER_ERROR,
			`Server Error: ${getErrorMessage(err)}`
		);
	}
};
