import { PrismaClient, Prisma, TechnologyEntity } from '@prisma/client';
import { TechnologyDataSource } from '../../data-sources';

export const mockDataSourceInstance: TechnologyDataSource = {
	getTechnologyById: jest.fn(),
	prismaClient: new PrismaClient(),
	redisCacheTtlSeconds: 0,
	getTechnologies: function (): Promise<TechnologyEntity[]> {
		throw new Error('Function not implemented.');
	},
	createTechnology: function (data: Prisma.TechnologyEntityCreateInput): Promise<TechnologyEntity> {
		throw new Error('Function not implemented.');
	},
	updateTechnology: function (
		id: number,
		updateTechnology: Prisma.TechnologyEntityUpdateInput
	): Promise<TechnologyEntity> {
		throw new Error('Function not implemented.');
	},
	deleteTechnology: function (id: number): Promise<TechnologyEntity> {
		throw new Error('Function not implemented.');
	},
	composeRedisKey: undefined,
	getCached: function (id: number): Promise<TechnologyEntity | null> {
		throw new Error('Function not implemented.');
	},
	cache: function (technology: TechnologyEntity): Promise<void> {
		throw new Error('Function not implemented.');
	},
	invalidateCached: function (id: number): Promise<void> {
		throw new Error('Function not implemented.');
	},
};
