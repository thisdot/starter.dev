import { getEnvironment } from '../../utils/contentful';
import { Environment } from 'contentful-management';
import getAll from './getAll';
import MockedFn = jest.MockedFn;

jest.mock('../../utils/contentful');

describe('getAll', () => {
	describe('when there are 2 mocked technologies', () => {
		beforeAll(() => {
			(getEnvironment as MockedFn<typeof getEnvironment>).mockResolvedValueOnce({
				getEntries: () => Promise.resolve({ items: [{}, {}] }),
			} as Environment);
		});
		afterAll(() => {
			(getEnvironment as MockedFn<typeof getEnvironment>).mockReset();
		});

		it('returns 2 entries', async () => {
			expect(await getAll()).toHaveLength(2);
		});
	});

	describe('when there are no technologies', () => {
		beforeAll(() => {
			(getEnvironment as MockedFn<typeof getEnvironment>).mockResolvedValueOnce({
				getEntries: () => Promise.resolve({ items: [] }),
			} as unknown as Environment);
		});
		afterAll(() => {
			(getEnvironment as MockedFn<typeof getEnvironment>).mockReset();
		});

		it('returns an empty array', async () => {
			expect(await getAll()).toEqual([]);
		});
	});

	describe('when passed pagination query properties', () => {
		const getEntries = jest.fn();
		beforeEach(() => {
			(getEnvironment as MockedFn<typeof getEnvironment>).mockResolvedValueOnce({
				getEntries: getEntries.mockClear().mockResolvedValue({ items: [] }),
			} as unknown as Environment);
		});
		afterAll(() => {
			(getEnvironment as MockedFn<typeof getEnvironment>).mockReset();
		});

		it('sends the right query to Contenful', async () => {
			await getAll(4, 10);
			expect(getEntries.mock.calls[0][0].limit).toBe(4);
			expect(getEntries.mock.calls[0][0].skip).toBe(10);
		});
		it('uses sane defaults', async () => {
			await getAll();
			expect(getEntries.mock.calls[0][0].limit).toBe(100);
			expect(getEntries.mock.calls[0][0].skip).toBe(0);
		});
	});

	describe('when Contentful is misbehaving', () => {
		beforeAll(async () => {
			jest.spyOn(console, 'log').mockImplementation(() => undefined);
			(getEnvironment as MockedFn<typeof getEnvironment>).mockResolvedValueOnce({
				getEntries: async () => {
					throw Error('MOCK_ERROR');
				},
			} as unknown as Environment);
		});
		afterAll(() => {
			(console.log as jest.MockedFn<typeof console.log>).mockClear();
		});

		it('logs and rethrows the error', async () => {
			await expect(getAll()).rejects.toThrow('MOCK_ERROR');
			expect(console.log).toHaveBeenLastCalledWith('Error: MOCK_ERROR');
		});
	});
});
