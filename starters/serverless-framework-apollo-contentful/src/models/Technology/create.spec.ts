import create from './create';
import { Environment } from 'contentful-management';
import { getEnvironment } from '../../utils/contentful';
import TechnologyModel from './TechnologyModel';
import MockedFn = jest.MockedFn;

jest.mock('../../utils/contentful');

describe('create', () => {
	describe('when passed valid technology fields', () => {
		const publish = jest.fn();
		const createEntry = jest.fn((_, fields) => Promise.resolve({ publish, ...fields }));
		let result: TechnologyModel;

		beforeAll(async () => {
			(getEnvironment as MockedFn<typeof getEnvironment>).mockResolvedValueOnce({
				createEntry,
			} as unknown as Environment);
			result = await create({
				displayName: 'MOCK_NAME',
				description: 'MOCK_DESCRIPTION',
				url: 'MOCK_URL',
			});
		});
		afterAll(() => {
			(getEnvironment as MockedFn<typeof getEnvironment>).mockReset();
		});

		it('publishes an entry in Contentful', () => {
			expect(publish).toHaveBeenCalled();
		});
		it('returns the right fields', () => {
			expect(result).toHaveProperty('displayName', 'MOCK_NAME');
			expect(result).toHaveProperty('description', 'MOCK_DESCRIPTION');
			expect(result).toHaveProperty('url', 'MOCK_URL');
		});
	});
});
