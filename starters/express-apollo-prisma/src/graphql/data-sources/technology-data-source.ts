import { PrismaClient, Prisma, TechnologyEntity } from '@prisma/client';
import { CacheAPIWrapper } from '../../cache';
import { InputMaybe } from '../schema/generated/types';

type TechnologyEntityId = TechnologyEntity['id'];

export type TechnologyEntityCollection = {
	totalCount: number;
	edges: TechnologyEntity[];
	pageInfo: {
		hasNextPage: boolean;
		endCursor: number | undefined | null;
	};
};

export class TechnologyDataSource {
	constructor(
		private prismaClient: PrismaClient,
		private cacheAPIWrapper?: CacheAPIWrapper<TechnologyEntity>
	) {}

	async getTechnologyById(id: TechnologyEntityId): Promise<TechnologyEntity | null> {
		let entity = await this.cacheAPIWrapper?.getCached(id);
		if (entity) {
			return entity;
		}
		entity = await this.prismaClient.technologyEntity.findFirst({
			where: {
				id,
			},
		});
		if (entity) {
			await this.cacheAPIWrapper?.cache(entity, 'id');
		}
		return entity;
	}

	async getTechnologies(
		first: number, // the number of items to return in a page
		after?: InputMaybe<number> | undefined // the cursor to start the next page from
	): Promise<TechnologyEntityCollection> {
		const where: Prisma.TechnologyEntityWhereInput = after ? { id: { gt: after } } : {};

		const [totalCount, edges] = await this.prismaClient.$transaction([
			this.prismaClient.technologyEntity.count(),
			this.prismaClient.technologyEntity.findMany({
				where,
				take: first,
				orderBy: { id: 'asc' },
			}),
		]);

		const endCursor = edges.length > 0 ? edges[edges.length - 1].id : undefined;
		const hasNextPage =
			(await this.prismaClient.technologyEntity.count({
				where: { id: { gt: endCursor } },
			})) > 0;
		return {
			totalCount,
			edges,
			pageInfo: {
				hasNextPage,
				endCursor,
			},
		};
	}

	async createTechnology(data: Prisma.TechnologyEntityCreateInput): Promise<TechnologyEntity> {
		const entity = await this.prismaClient.technologyEntity.create({
			data,
		});
		this.cacheAPIWrapper?.cache(entity, 'id');
		return entity;
	}

	async updateTechnology(
		id: TechnologyEntityId,
		updateTechnology: Prisma.TechnologyEntityUpdateInput
	): Promise<TechnologyEntity> {
		const entity = await this.prismaClient.technologyEntity.update({
			where: {
				id,
			},
			data: updateTechnology,
		});
		await this.cacheAPIWrapper?.cache(entity, 'id');
		return entity;
	}

	async deleteTechnology(id: TechnologyEntityId): Promise<TechnologyEntity> {
		const deleted = await this.prismaClient.technologyEntity.delete({
			where: {
				id,
			},
		});
		if (deleted) {
			await this.cacheAPIWrapper?.invalidateCached(id);
		}
		return deleted;
	}
}
