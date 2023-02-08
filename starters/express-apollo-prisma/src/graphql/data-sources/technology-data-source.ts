import { PrismaClient, Prisma, TechnologyEntity } from '@prisma/client';
import { CacheAPIWrapper } from '../../cache';

type TechnologyEntityId = TechnologyEntity['id'];

export class TechnologyDataSource {
	constructor(private prismaClient: PrismaClient, private cacheAPIWrapper?: CacheAPIWrapper) {}

	async getTechnologyById(id: TechnologyEntityId): Promise<TechnologyEntity | null> {
		let entity = await this.cacheAPIWrapper?.getCached<TechnologyEntity>(id);
		if (entity) {
			return entity;
		}
		entity = await this.prismaClient.technologyEntity.findFirst({
			where: {
				id,
			},
		});
		if (entity) {
			await this.cacheAPIWrapper?.cache<TechnologyEntity>(entity, 'id');
		}
		return entity;
	}

	async getTechnologies(): Promise<TechnologyEntity[]> {
		return await this.prismaClient.technologyEntity.findMany();
	}

	async createTechnology(data: Prisma.TechnologyEntityCreateInput): Promise<TechnologyEntity> {
		const entity = await this.prismaClient.technologyEntity.create({
			data,
		});
		this.cacheAPIWrapper?.cache<TechnologyEntity>(entity, 'id');
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
		await this.cacheAPIWrapper?.cache<TechnologyEntity>(entity, 'id');
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
