import { getEnvironment } from '../../utils/contentful';
import { Environment } from 'contentful-management';
import getById from './getById';
import MockedFn = jest.MockedFn;

jest.mock('../../utils/contentful');

describe('get', () => {
	describe('when there is a technology with id MOCK', () => {
		const getEntry = jest.fn().mockResolvedValue({ sys: { id: 'MOCK' } });
		beforeAll(() => {
			(getEnvironment as MockedFn<typeof getEnvironment>).mockResolvedValueOnce({
				getEntry,
			} as unknown as Environment);
		});
		afterAll(() => {
			(getEnvironment as MockedFn<typeof getEnvironment>).mockReset();
		});

		it('retrieves the technology with id MOCK', async () => {
			expect(await getById('MOCK')).toHaveProperty('id', 'MOCK');
			expect(getEntry).toHaveBeenCalledWith('MOCK');
		});
	});
});
