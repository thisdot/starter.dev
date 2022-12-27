import { DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { getClient } from './getClient';
import { deleteItem } from './deleteItem';

describe('dynamodb.deleteItem()', () => {
	let subject: Record<string, unknown> | null;
	const ddbMock = mockClient(getClient());

	afterAll(() => {
		ddbMock.restore();
		jest.resetAllMocks();
	});

	describe('when item exists', () => {
		beforeAll(async () => {
			ddbMock.on(DeleteItemCommand).resolves({
				Attributes: {
					description: {
						S: 'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
					},
					id: { S: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff' },
					websiteUrl: { S: 'https://jestjs.io/' },
					displayName: { S: 'Jest' },
				},
			});
			subject = await deleteItem('technology-test', {
				id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
			});
		});

		it('returns the old unmarshalled item', () => {
			expect(subject).toEqual({
				description:
					'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
				id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
				websiteUrl: 'https://jestjs.io/',
				displayName: 'Jest',
			});
		});
	});

	describe('when item does not exist', () => {
		beforeAll(async () => {
			jest.spyOn(console, 'error').mockImplementation(() => {});
			ddbMock.on(DeleteItemCommand).resolves({
				Attributes: undefined,
			});
			subject = await deleteItem('technology-test', {
				id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
			});
		});

		it('returns null', () => {
			expect(subject).toBeNull();
		});
	});

	describe('when error occurs', () => {
		beforeAll(async () => {
			ddbMock.on(DeleteItemCommand).rejects('mock error');
			subject = await deleteItem('technology-test', {
				id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
			});
		});

		it('returns null', () => {
			expect(subject).toBeNull();
		});

		it('logs the error', () => {
			expect(console.error).toHaveBeenCalledWith('dynamodb.deleteItem Error - mock error');
		});
	});
});
