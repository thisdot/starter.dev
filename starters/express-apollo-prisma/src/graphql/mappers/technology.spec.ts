import { mapTechnology } from './technology';
import { TechnologyEntity } from '@prisma/client';
import { Technology } from '../schema/generated/types';

describe('.mapTechnology', () => {
	describe('when called', () => {
		it('returns expected result', () => {
			const MOCK_TECHNOLOGY: TechnologyEntity = {
				id: 123,
				displayName: 'MOCK_TECHNOLOGY',
				description: 'MOCK_TECHNOLOGY_DESCRIPTION',
				url: 'MOCK_TECHNOLOGY_URL',
			};
			const expectResult: Technology = {
				__typename: 'Technology',
				id: '123',
				displayName: 'MOCK_TECHNOLOGY',
				description: 'MOCK_TECHNOLOGY_DESCRIPTION',
				url: 'MOCK_TECHNOLOGY_URL',
			};

			const result = mapTechnology(MOCK_TECHNOLOGY);

			expect(result).toEqual(expectResult);
		});
	});
});
