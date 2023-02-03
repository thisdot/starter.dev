import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

export const createMockPrismaClient = (): DeepMockProxy<PrismaClient> => mockDeep<PrismaClient>();
