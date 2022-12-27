import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { getClient } from './getClient';
import { getItem } from './getItem';

describe('dynamodb.getItem()', () => {
	let subject: Record<string, unknown> | null;
	const ddbMock = mockClient(getClient());

	afterAll(() => {
		ddbMock.restore();
		jest.resetAllMocks();
	});

	describe('when item is found', () => {
		beforeAll(async () => {
			ddbMock.on(GetItemCommand).resolves({
				Item: {
					description: {
						S: 'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
					},
					id: { S: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff' },
					websiteUrl: { S: 'https://jestjs.io/' },
					displayName: { S: 'Jest' },
				},
			});
			subject = await getItem('technology-test', {
				id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
			});
		});

		it('returns the unmarshalled item', () => {
			expect(subject).toEqual({
				description:
					'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
				id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
				websiteUrl: 'https://jestjs.io/',
				displayName: 'Jest',
			});
		});
	});

	describe('when item is not found', () => {
		beforeAll(async () => {
			jest.spyOn(console, 'error').mockImplementation(() => {});
			ddbMock.on(GetItemCommand).resolves({
				Item: undefined,
			});
			subject = await getItem('technology-test', {
				id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
			});
		});

		it('returns null', () => {
			expect(subject).toBeNull();
		});
	});

	describe('when error occurs', () => {
		beforeAll(async () => {
			ddbMock.on(GetItemCommand).rejects('mock error');
			subject = await getItem('technology-test', {
				id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
			});
		});

		it('returns null', () => {
			expect(subject).toBeNull();
		});

		it('logs the error', () => {
			expect(console.error).toHaveBeenCalledWith('dynamodb.getItem Error - mock error');
		});
	});
});
