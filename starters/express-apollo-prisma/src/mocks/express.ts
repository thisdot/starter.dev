import { Response, Request } from 'express';
import { mock, MockProxy } from 'jest-mock-extended';

export const createMockExpressResponse = (): MockProxy<Response> => {
	const mockedResponse = mock<Response>();
	mockedResponse.status.mockImplementation(() => mockedResponse);
	return mockedResponse;
};

export const createMockExpressRequest = (): MockProxy<Request> => mock<Request>();
