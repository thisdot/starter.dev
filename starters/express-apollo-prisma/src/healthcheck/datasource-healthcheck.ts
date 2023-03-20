import { PrismaClient, Prisma } from '@prisma/client';

export const getDataSourceHealth = async (prismaClient?: PrismaClient) => {
	try {
		const prismaClientPingResult = await prismaClient?.$queryRaw<[{ 1: bigint }]>(
			Prisma.sql(['SELECT 1'])
		);
		return Number(prismaClientPingResult?.[0][1]) === 1;
	} catch {
		return false;
	}
};
