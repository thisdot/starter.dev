import { sendMessage } from './sendMessage';
import { getClient } from './client';

jest.mock('./client', () => ({
	getClient: jest.fn().mockReturnValue({
		send: jest.fn().mockResolvedValue({}),
	}),
}));

jest.mock('./getQueueUrl', () => ({
	getQueueUrl: jest.fn().mockResolvedValue('queue-url'),
}));

describe('sendMessage', () => {
	it('should return an object with success true and the data returned by the send method', async () => {
		const message = { key: 'value' };
		const result = await sendMessage(message);
		expect(result).toEqual({
			success: true,
			data: {},
		});
		expect(getClient).toHaveBeenCalled();
		expect(getClient().send).toHaveBeenCalledWith(
			expect.objectContaining({
				input: {
					QueueUrl: 'queue-url',
					MessageBody: JSON.stringify(message),
				},
			})
		);
	});

	it('should return an object with success false and the error message if the send method throws an error', async () => {
		const errorMessage = 'error message';
		jest
			.spyOn(getClient(), 'send')
			.mockRejectedValue(new Error(errorMessage) as never);
		const message = { key: 'value' };
		const result = await sendMessage(message);
		expect(result).toEqual({
			success: false,
			data: errorMessage,
		});
		expect(getClient).toHaveBeenCalled();
		expect(getClient().send).toHaveBeenCalledWith(
			expect.objectContaining({
				input: {
					QueueUrl: 'queue-url',
					MessageBody: JSON.stringify(message),
				},
			})
		);
	});

	it('should return a string representation of the error if it is not an instance of Error', async () => {
		const error = { message: 'error message' };
		jest
			.spyOn(getClient(), 'send')
			.mockRejectedValue(new Error(error.message) as never);
		const message = { key: 'value' };
		const result = await sendMessage(message);
		expect(result).toEqual({ data: 'error message', success: false });
		expect(getClient).toHaveBeenCalled();
		expect(getClient().send).toHaveBeenCalledWith(
			expect.objectContaining({
				input: {
					QueueUrl: 'queue-url',
					MessageBody: JSON.stringify(message),
				},
			})
		);
	});
});
