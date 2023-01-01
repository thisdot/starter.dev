import type { APIGatewayProxyHandler } from 'aws-lambda';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { TechnologyCreateSchema } from '@/types/technology';
import { create as createTechnology } from '@/models/technology/create';
import { responseHelper } from '@/utils/responseHelper/responseHelper';
import { getErrorMessage } from '@/utils/error/getErrorMessage';

export const handler: APIGatewayProxyHandler = async (event) => {
	try {
		const payload = event.body ? JSON.parse(event.body) : null;
		TechnologyCreateSchema.parse(payload);
		const technology = await createTechnology(payload);

		return responseHelper(StatusCodes.CREATED, technology);
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
