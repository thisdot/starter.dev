import { DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { getClient } from '@/utils/dynamodb';
import { destroy } from './destroy';

describe('technology.destroy()', () => {
	let subject: Record<string, unknown> | null;

	const ddbMock = mockClient(getClient());

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
		subject = await destroy('87af19b1-aa0d-4178-a30c-2fa8cd1f2cff');
	});

	afterAll(() => {
		ddbMock.restore();
		jest.resetAllMocks();
	});

	it('returns the deleted technology', () => {
		expect(subject).toEqual({
			description:
				'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
			id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
			websiteUrl: 'https://jestjs.io/',
			displayName: 'Jest',
		});
	});
});
