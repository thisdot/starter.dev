import { TechnologyEntity } from '@prisma/client';
import { TechnologyEntityCollection } from '../data-sources';
import { Technology, TechnologyCollection } from '../schema/generated/types';

export const mapTechnology = (entity: TechnologyEntity): Technology => ({
	__typename: 'Technology',
	id: String(entity.id),
	displayName: entity.displayName,
	description: entity.description,
	url: entity.url,
});

export const mapTechnologyCollection = (
	entityCollectionPage: TechnologyEntityCollection
): TechnologyCollection => {
	return {
		totalCount: entityCollectionPage.totalCount,
		edges: entityCollectionPage.edges.map((entity) => ({
			__typename: 'TechnologyNode',
			node: mapTechnology(entity.node),
			cursor: entity.cursor,
		})),
		pageInfo: entityCollectionPage.pageInfo,
	};
};
