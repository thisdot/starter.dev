import { ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { getClient } from './getClient';
import { listTables } from './listTables';

describe('dynamodb.listTables()', () => {
	let subject: Awaited<ReturnType<typeof listTables>> | ReturnType<typeof listTables>;
	const ddbMock = mockClient(getClient());

	afterAll(() => {
		ddbMock.restore();
		jest.resetAllMocks();
	});

	describe('when items are found', () => {
		beforeAll(async () => {
			ddbMock.on(ListTablesCommand).resolves({
				TableNames: ['Table1', 'Table2'],
			});
			subject = await listTables();
		});

		it('returns the table names', () => {
			expect(subject).toEqual(['Table1', 'Table2']);
		});
	});

	describe('when items are not found', () => {
		beforeAll(async () => {
			jest.spyOn(console, 'error').mockImplementation(() => {});
			ddbMock.on(ListTablesCommand).resolves({
				TableNames: undefined,
			});
			subject = listTables();
		});

		it('throws error', async () => {
			await expect(subject).rejects.toThrow();
		});
	});

	describe('when error occurs', () => {
		beforeAll(async () => {
			ddbMock.on(ListTablesCommand).rejects('mock error');
			subject = listTables();
		});

		it('throws error', async () => {
			await expect(subject).rejects.toThrow();
		});

		it('logs the error', () => {
			expect(console.error).toHaveBeenCalledWith('dynamodb.listTables Error - mock error');
		});
	});
});
