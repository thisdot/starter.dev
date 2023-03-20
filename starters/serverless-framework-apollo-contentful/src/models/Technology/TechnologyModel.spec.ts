import TechnologyModel from './TechnologyModel';
import { Entry } from 'contentful-management';

jest.mock('../../utils/contentful');

describe('TechnologyModel', () => {
	describe('.update', () => {
		describe('when passed new display name', () => {
			const entry = {
				publish: jest.fn(),
				update: jest.fn(),
				isDraft: () => false,
				fields: {
					displayName: { 'en-US': 'OLD_NAME' },
					description: { 'en-US': 'MOCK_DESCRIPTION' },
					url: { 'en-US': 'MOCK_URL' },
				},
			};
			entry.publish.mockImplementation(() => entry);
			entry.update.mockImplementation(() => entry);
			const technology = new TechnologyModel(entry as unknown as Entry);

			beforeAll(async () => {
				await technology.update({ displayName: 'NEW_NAME' });
			});

			it('updates the entry', () => {
				expect(entry.fields.displayName['en-US']).toBe('NEW_NAME');
				expect(entry.update).toHaveBeenCalled();
			});
			it('publishes the updated entry', () => {
				expect(entry.publish).toHaveBeenCalled();
			});
			it('does not alter other fields', () => {
				expect(entry.fields.description['en-US']).toBe('MOCK_DESCRIPTION');
				expect(entry.fields.url['en-US']).toBe('MOCK_URL');
			});
		});
	});

	describe('.delete', () => {
		describe('when the entry is published', () => {
			const entry = { delete: jest.fn(), unpublish: jest.fn(), isPublished: () => true };
			entry.unpublish.mockImplementation(() => entry);
			const technology = new TechnologyModel(entry as unknown as Entry);

			beforeAll(async () => {
				await technology.delete();
			});

			it('unpublishes and deletes the entry', () => {
				expect(entry.unpublish).toHaveBeenCalled();
				expect(entry.delete).toHaveBeenCalled();
			});
		});
		describe('when the entry is published', () => {
			const entry = { delete: jest.fn(), isPublished: () => false };
			const technology = new TechnologyModel(entry as unknown as Entry);

			beforeAll(async () => {
				await technology.delete();
			});

			it('calls delete on the entry', () => {
				expect(entry.delete).toHaveBeenCalled();
			});
		});
	});
});
