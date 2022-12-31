import {
	GetItemCommand,
	PutItemCommand,
	ServiceInputTypes,
	ServiceOutputTypes,
} from '@aws-sdk/client-dynamodb';
import { AwsStub, mockClient } from 'aws-sdk-client-mock';
import { getClient } from '@/utils/dynamodb';
import { update } from './update';

describe('technology.update()', () => {
	let subject: Record<string, unknown> | null;
	let ddbMock: AwsStub<ServiceInputTypes, ServiceOutputTypes>;

	beforeAll(() => {
		jest.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterAll(() => {
		jest.resetAllMocks();
	});

	describe('when no existing record', () => {
		beforeAll(async () => {
			ddbMock = mockClient(getClient());
			ddbMock.on(GetItemCommand).resolvesOnce({
				Item: undefined,
			});
			subject = await update('87af19b1-aa0d-4178-a30c-2fa8cd1f2cff', {
				displayName: 'Jest v29',
			});
		});

		afterAll(() => {
			ddbMock.restore();
		});

		it('returns null', () => {
			expect(subject).toBeNull();
		});
	});

	describe('when record updated successfully', () => {
		beforeAll(async () => {
			ddbMock = mockClient(getClient());
			ddbMock.on(GetItemCommand).resolvesOnce({
				Item: {
					description: {
						S: 'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
					},
					id: { S: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff' },
					websiteUrl: { S: 'https://jestjs.io/' },
					displayName: { S: 'Jest' },
				},
			});
			ddbMock.on(PutItemCommand).resolves({
				Attributes: {
					description: {
						S: 'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
					},
					id: { S: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff' },
					websiteUrl: { S: 'https://jestjs.io/' },
					displayName: { S: 'Jest v29' },
				},
			});
			subject = await update('87af19b1-aa0d-4178-a30c-2fa8cd1f2cff', {
				displayName: 'Jest v29',
			});
		});

		afterAll(() => {
			ddbMock.restore();
		});

		it('returns the updated record', () => {
			expect(subject).toEqual({
				id: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff',
				displayName: 'Jest v29',
				description:
					'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
				websiteUrl: 'https://jestjs.io/',
			});
		});
	});

	describe('when record update fails', () => {
		beforeAll(async () => {
			ddbMock = mockClient(getClient());
			ddbMock.on(GetItemCommand).resolvesOnce({
				Item: {
					description: {
						S: 'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!',
					},
					id: { S: '87af19b1-aa0d-4178-a30c-2fa8cd1f2cff' },
					websiteUrl: { S: 'https://jestjs.io/' },
					displayName: { S: 'Jest' },
				},
			});
			ddbMock.on(PutItemCommand).rejects('mock error');
			subject = await update('87af19b1-aa0d-4178-a30c-2fa8cd1f2cff', {
				displayName: 'Jest v29',
			});
		});

		afterAll(() => {
			ddbMock.restore();
		});

		it('returns null', () => {
			expect(subject).toBeNull();
		});
	});
});
