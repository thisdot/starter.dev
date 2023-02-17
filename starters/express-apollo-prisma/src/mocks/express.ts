import { Response } from 'express';

export const MOCK_SEND = jest.fn();
export const MOCK_RESPONSE = {
	send: MOCK_SEND,
	status: jest.fn(() => MOCK_RESPONSE),
} as unknown as Response;
