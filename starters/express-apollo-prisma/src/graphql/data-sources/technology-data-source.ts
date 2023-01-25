import { PrismaClient, Prisma, TechnologyEntity } from '@prisma/client';

export class TechnologyDataSource {
	constructor(private prismaClient: PrismaClient) {}

	async getTechnologyById(id: number): Promise<TechnologyEntity | null> {
		return await this.prismaClient.technologyEntity.findFirst({
			where: {
				id,
			},
		});
	}

	async getTechnologies(): Promise<TechnologyEntity[]> {
		return await this.prismaClient.technologyEntity.findMany();
	}

	async createTechnology(data: Prisma.TechnologyEntityCreateInput): Promise<TechnologyEntity> {
		return await this.prismaClient.technologyEntity.create({
			data,
		});
	}

	async updateTechnology(
		id: number,
		updateTechnology: Prisma.TechnologyEntityUpdateInput
	): Promise<TechnologyEntity> {
		return await this.prismaClient.technologyEntity.update({
			where: {
				id,
			},
			data: updateTechnology,
		});
	}

	async deleteTechnology(id: number): Promise<TechnologyEntity> {
		return await this.prismaClient.technologyEntity.delete({
			where: {
				id,
			},
		});
	}
}
