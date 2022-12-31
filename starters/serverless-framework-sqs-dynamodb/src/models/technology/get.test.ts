import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { getClient } from '@/utils/dynamodb';
import { get } from './get';

describe('technology.get()', () => {
	let subject: Record<string, unknown> | null;

	const ddbMock = mockClient(getClient());

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
		subject = await get('87af19b1-aa0d-4178-a30c-2fa8cd1f2cff');
	});

	afterAll(() => {
		ddbMock.restore();
		jest.resetAllMocks();
	});

	it('returns the requested technology', () => {
		expect(subject).toEqual({
			description:
				'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
			id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
			websiteUrl: 'https://jestjs.io/',
			displayName: 'Jest',
		});
	});
});
