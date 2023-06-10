import { createMockPrismaClient } from '../../mocks/prisma-client';
import { getDataSourceHealth } from './datasource';

describe('.getDataSourceHealth', () => {
	describe('when called without prismaCleint', () => {
		let result: boolean;

		beforeAll(async () => {
			result = await getDataSourceHealth();
		});

		it('returns expected result', () => {
			expect(result).toBe(false);
		});
	});
	describe('when called with prismaClient', () => {
		const MOCK_PRISMA_CLIENT = createMockPrismaClient();

		describe('and prismaClient.$queryRaw returns mock value', () => {
			let result: boolean;
			const MOCK_VALUE = [{ '1': BigInt(1) }];

			beforeAll(async () => {
				MOCK_PRISMA_CLIENT.$queryRaw.mockResolvedValue(MOCK_VALUE);
				result = await getDataSourceHealth(MOCK_PRISMA_CLIENT);
			});

			afterAll(() => {
				MOCK_PRISMA_CLIENT.$queryRaw.mockReset();
			});

			it('calls prismaClient.$queryRaw method once with correct query', () => {
				expect(MOCK_PRISMA_CLIENT.$queryRaw).toHaveBeenCalledTimes(1);
			});

			it('returns expected result', () => {
				expect(result).toBe(true);
			});
		});

		describe('and prismaClient.$queryRaw throws Error', () => {
			let result: boolean;

			beforeAll(async () => {
				MOCK_PRISMA_CLIENT.$queryRaw.mockRejectedValue(new Error());
				result = await getDataSourceHealth(MOCK_PRISMA_CLIENT);
			});

			afterAll(() => {
				MOCK_PRISMA_CLIENT.$queryRaw.mockReset();
			});

			it('calls prismaClient.$queryRaw method once', () => {
				expect(MOCK_PRISMA_CLIENT.$queryRaw).toHaveBeenCalledTimes(1);
			});

			it('returns expected result', () => {
				expect(result).toBe(false);
			});
		});
	});
});
