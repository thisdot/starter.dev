import { TechnologyModel } from './TechnologyModel';
import { getEnvironment } from '../utils/contentful';
import { Entry, Environment } from 'contentful-management';
import MockedFn = jest.MockedFn;

jest.mock('../utils/contentful');

describe('TechnologyModel', () => {
	describe('#getAll', () => {
		describe('when there are 2 mocked technologies', () => {
			beforeAll(() => {
				(
					getEnvironment as MockedFn<typeof getEnvironment>
				).mockResolvedValueOnce({
					getEntries: () => Promise.resolve({ items: [{}, {}] }),
				} as Environment);
			});
			afterAll(() => {
				(getEnvironment as MockedFn<typeof getEnvironment>).mockReset();
			});

			it('returns 2 entries', async () => {
				expect(await TechnologyModel.getAll()).toHaveLength(2);
			});
		});
		describe('when there are no technologies', () => {
			beforeAll(() => {
				(
					getEnvironment as MockedFn<typeof getEnvironment>
				).mockResolvedValueOnce({
					getEntries: () => Promise.resolve({ items: [] }),
				} as unknown as Environment);
			});
			afterAll(() => {
				(getEnvironment as MockedFn<typeof getEnvironment>).mockReset();
			});

			it('returns an empty array', async () => {
				expect(await TechnologyModel.getAll()).toEqual([]);
			});
		});
	});

	describe('#get', () => {
		describe('when there is a technology with id MOCK', () => {
			const getEntry = jest.fn().mockResolvedValue({ id: 'MOCK' });
			beforeAll(() => {
				(
					getEnvironment as MockedFn<typeof getEnvironment>
				).mockResolvedValueOnce({ getEntry } as unknown as Environment);
			});
			afterAll(() => {
				(getEnvironment as MockedFn<typeof getEnvironment>).mockReset();
			});

			it('retrieves the technology with id MOCK', async () => {
				expect(await TechnologyModel.get('MOCK')).toHaveProperty('id', 'MOCK');
				expect(getEntry).toHaveBeenCalledWith('MOCK');
			});
		});
	});

	describe('#create', () => {
		describe('when passed valid technology fields', () => {
			const publish = jest.fn();
			const entry = {
				publish,
				displayName: 'MOCK_NAME',
			};
			const createEntry = jest.fn().mockReturnValue(entry);
			let result: Entry;

			beforeAll(async () => {
				(
					getEnvironment as MockedFn<typeof getEnvironment>
				).mockResolvedValueOnce({ createEntry } as unknown as Environment);
				result = await TechnologyModel.create({
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
			it('returns the entry', () => {
				expect(result).toBe(entry);
			});
		});
	});

	describe('#update', () => {
		describe('when passed new display name', () => {
			const update = jest.fn();
			const publish = jest.fn();
			const entry = {
				update,
				publish,
				fields: {
					displayName: { 'en-US': 'OLD_NAME' },
					description: { 'en-US': 'MOCK_DESCRIPTION' },
					url: { 'en-US': 'MOCK_URL' },
				},
			};
			const getEntry = jest.fn().mockReturnValue(entry);

			beforeAll(async () => {
				(
					getEnvironment as MockedFn<typeof getEnvironment>
				).mockResolvedValueOnce({ getEntry } as unknown as Environment);
				await TechnologyModel.update('MOCK_ID', { displayName: 'NEW_NAME' });
			});
			afterAll(() => {
				(getEnvironment as MockedFn<typeof getEnvironment>).mockReset();
			});

			it('gets the relevant entry', () => {
				expect(getEntry).toHaveBeenCalledWith('MOCK_ID');
			});
			it('updates the entry', () => {
				expect(entry.fields.displayName['en-US']).toBe('NEW_NAME');
				expect(update).toHaveBeenCalled();
			});
			it('publishes the updated entry', () => {
				expect(publish).toHaveBeenCalledWith();
			});
			it('does not alter other fields', () => {
				expect(entry.fields.description['en-US']).toBe('MOCK_DESCRIPTION');
				expect(entry.fields.url['en-US']).toBe('MOCK_URL');
			});
		});
	});
});
