import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { getClient } from './getClient';
import { putItem } from './putItem';

describe('dynamodb.putItem()', () => {
	let subject: boolean;
	const ddbMock = mockClient(getClient());

	afterAll(() => {
		ddbMock.restore();
		jest.resetAllMocks();
	});

	describe('when putting an item', () => {
		beforeAll(async () => {
			ddbMock.on(PutItemCommand).resolves({
				Attributes: undefined,
			});
			subject = await putItem('technology-test', {
				description:
					'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
				id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
				websiteUrl: 'https://jestjs.io/',
				displayName: 'Jest',
			});
		});

		it('returns true', () => {
			expect(subject).toEqual(true);
		});
	});

	describe('when error occurs', () => {
		beforeAll(async () => {
			jest.spyOn(console, 'error').mockImplementation(() => {});
			ddbMock.on(PutItemCommand).rejects('mock error');
			subject = await putItem('technology-test', {
				id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
				displayName: 'Jest Test',
			});
		});

		it('returns false', () => {
			expect(subject).toEqual(false);
		});

		it('logs the error', () => {
			expect(console.error).toHaveBeenCalledWith('dynamodb.putItem Error - mock error');
		});
	});
});
