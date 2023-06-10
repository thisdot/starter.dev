import { mock, MockProxy } from 'jest-mock-extended';
import { CacheAPIWrapper } from '../lib/cache';

export const createMockCacheApiWrapper = <
	TEntity extends { [k: string]: number | string | null },
	TUniqueKey extends keyof TEntity = 'id'
>(): MockProxy<CacheAPIWrapper<TEntity, TUniqueKey>> =>
	mock<CacheAPIWrapper<TEntity, TUniqueKey>>();
