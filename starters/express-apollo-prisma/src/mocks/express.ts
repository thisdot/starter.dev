import { Response } from 'express';

export const createMockExpressResponse = (): Response => {
	const mockedSend = jest.fn();
	const mockedResponse = {
		send: mockedSend,
		status: jest.fn(() => mockedResponse),
	} as unknown as Response;
	return mockedResponse;
};
