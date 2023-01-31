import { PrismaClient, Prisma, TechnologyEntity } from '@prisma/client';
import { RedisClient } from '../../redis';

type TechnologyEntityId = TechnologyEntity['id'];

export class TechnologyDataSource {
	constructor(
		private prismaClient: PrismaClient,
		private redisClient?: RedisClient,
		private redisCacheTtlSeconds: number = 360
	) {}

	async getTechnologyById(id: TechnologyEntityId): Promise<TechnologyEntity | null> {
		let entity = await this.getCached(id);
		if (entity) {
			return entity;
		}
		entity = await this.prismaClient.technologyEntity.findFirst({
			where: {
				id,
			},
		});
		if (entity) {
			await this.cache(entity);
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
		this.cache(entity);
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
		await this.cache(entity);
		return entity;
	}

	async deleteTechnology(id: TechnologyEntityId): Promise<TechnologyEntity> {
		const deleted = await this.prismaClient.technologyEntity.delete({
			where: {
				id,
			},
		});
		if (deleted) {
			await this.invalidateCached(id);
		}
		return deleted;
	}

	private composeRedisKey = (id?: TechnologyEntityId): string => `technology:${id || '*'}`;

	private async getCached(id: TechnologyEntityId): Promise<TechnologyEntity | null> {
		if (this.redisClient) {
			try {
				const key = this.composeRedisKey(id);
				const serialized = await this.redisClient.get(key);
				if (serialized) {
					return JSON.parse(serialized);
				}
			} catch {
				console.warn('Redis cache disabled. Please restart the server');
			}
		}
		return null;
	}

	private async cache(technology: TechnologyEntity): Promise<void> {
		if (this.redisClient) {
			try {
				const key = this.composeRedisKey(technology.id);
				const serialized = JSON.stringify(technology);
				await this.redisClient.set(key, serialized, {
					EX: this.redisCacheTtlSeconds,
				});
			} catch {
				console.warn('Redis cache disabled. Please restart the server');
			}
		}
	}

	private async invalidateCached(id: TechnologyEntityId): Promise<void> {
		if (this.redisClient) {
			try {
				const key = this.composeRedisKey(id);
				await this.redisClient.del(key);
			} catch {
				console.warn('Redis cache disabled. Please restart the server');
			}
		}
	}
}
