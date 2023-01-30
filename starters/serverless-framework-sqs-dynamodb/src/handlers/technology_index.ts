import type { APIGatewayProxyHandler } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { getAll as getAllTechnology } from '@/models/technology/getAll';
import { responseHelper } from '@/utils/responseHelper/responseHelper';

export const handler: APIGatewayProxyHandler = async () => {
	const technologies = await getAllTechnology();
	return responseHelper(StatusCodes.OK, technologies);
};
