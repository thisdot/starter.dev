import { TechnologyEntity } from '@prisma/client';
import { TechnologyEntityCollectionPage } from '../data-sources';
import { Technology, TechnologyCollectionPage } from '../schema/generated/types';

export const mapTechnology = (entity: TechnologyEntity): Technology => ({
	__typename: 'Technology',
	id: String(entity.id),
	displayName: entity.displayName,
	description: entity.description,
	url: entity.url,
});

export const mapTechnologyCollectionPage = (
	entityCollectionPage: TechnologyEntityCollectionPage
): TechnologyCollectionPage => {
	return {
		totalCount: entityCollectionPage.totalCount,
		items: entityCollectionPage.items.map(mapTechnology),
	};
};
