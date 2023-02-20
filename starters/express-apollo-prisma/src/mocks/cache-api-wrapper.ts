import { TechnologyEntity } from '@prisma/client';
import { mock, MockProxy } from 'jest-mock-extended';
import { CacheAPIWrapper } from '../cache';

export const createMockCacheApiWrapper = (): MockProxy<CacheAPIWrapper<TechnologyEntity>> =>
	mock<CacheAPIWrapper<TechnologyEntity>>();
