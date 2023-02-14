import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { CacheAPIWrapper } from '../cache';

export const createMockCacheApiWrapper = (): DeepMockProxy<CacheAPIWrapper> =>
	mockDeep<CacheAPIWrapper>();
