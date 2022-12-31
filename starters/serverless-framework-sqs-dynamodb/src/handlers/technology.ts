import type { APIGatewayProxyHandler } from 'aws-lambda';
import { ZodError } from 'zod';
import { TechnologyCreateSchema, TechnologyUpdateSchema } from '@/types/technology';
import {
	getAll as getAllTechnology,
	create as createTechnology,
	get as getTechnology,
	update as updateTechnology,
	destroy as destroyTechnology,
} from '@/models/technology';
import { getErrorMessage } from '@/utils/error';
import { StatusCodes } from 'http-status-codes';

export const index: APIGatewayProxyHandler = async () => {
	const technologies = await getAllTechnology();
	return responseHelper(StatusCodes.OK, technologies);
};

export const create: APIGatewayProxyHandler = async (event) => {
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

export const show: APIGatewayProxyHandler = async (event) => {
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

export const update: APIGatewayProxyHandler = async (event) => {
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

export const destroy: APIGatewayProxyHandler = async (event) => {
	const id = event.pathParameters?.id;
	if (!id) {
		return responseHelper(StatusCodes.BAD_REQUEST, 'Bad Request: no id provided');
	}

	try {
		const technology = await destroyTechnology(id);
		return responseHelper(StatusCodes.OK, technology);
	} catch (err) {
		console.error(err);
		return responseHelper(
			StatusCodes.INTERNAL_SERVER_ERROR,
			`Server Error: ${getErrorMessage(err)}`
		);
	}
};

function responseHelper(statusCode: number, resp: unknown) {
	return {
		statusCode,
		body: typeof resp === 'string' ? resp : JSON.stringify(resp),
	};
}
