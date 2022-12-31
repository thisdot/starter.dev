import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { getClient } from '@/utils/dynamodb';
import { create } from './create';

describe('technology.create()', () => {
	let subject: Record<string, unknown> | null;

	const ddbMock = mockClient(getClient());

	afterAll(() => {
		ddbMock.restore();
		jest.resetAllMocks();
	});

	describe('when successfully creates the record', () => {
		beforeAll(async () => {
			ddbMock.on(PutItemCommand).resolves({
				Attributes: undefined,
			});
			subject = await create({
				description:
					'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
				websiteUrl: 'https://jestjs.io/',
				displayName: 'Jest',
			});
		});

		it('returns the newly created technology', () => {
			expect(subject).toEqual({
				description:
					'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
				id: expect.any(String),
				websiteUrl: 'https://jestjs.io/',
				displayName: 'Jest',
			});
		});
	});

	describe('when fails to create the record', () => {
		beforeAll(async () => {
			jest.spyOn(console, 'error').mockImplementation(() => {});
			ddbMock.on(PutItemCommand).rejects('mock error');
			subject = await create({
				description:
					'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
				websiteUrl: 'https://jestjs.io/',
				displayName: 'Jest',
			});
		});

		it('returns null', () => {
			expect(subject).toBeNull();
		});
	});
});
