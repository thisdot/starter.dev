import { mapTechnology } from './technology';
import { TechnologyEntity } from '@prisma/client';
import { Technology } from '../schema/generated/types';

describe('.mapTechnology', () => {
	describe('when called', () => {
		it('returns expected result', () => {
			const MOCK_TECHNOLOGY: TechnologyEntity = {
				id: 123,
				name: 'MOCK_TECHNOLOGY',
			};
			const expectResult: Technology = {
				__typename: 'Technology',
				id: '123',
				name: 'MOCK_TECHNOLOGY',
			};

			const result = mapTechnology(MOCK_TECHNOLOGY);

			expect(result).toEqual(expectResult);
		});
	});
});
