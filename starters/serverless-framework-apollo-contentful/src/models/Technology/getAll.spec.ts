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
});
