import { Response, Request } from 'express';
import { mock, MockProxy } from 'jest-mock-extended';

export const createMockExpressResponse = (): Response => {
	const mockedSend = jest.fn();
	const mockedResponse = {
		send: mockedSend,
		sendStatus: jest.fn(),
		status: jest.fn(() => mockedResponse),
	} as unknown as Response;
	return mockedResponse;
};

export const createMockExpressRequest = (): MockProxy<Request> => mock<Request>();
