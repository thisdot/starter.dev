export interface CacheAPIWrapper<
	TEntity extends { [k: string]: number | string | null },
	TUniqueKey extends keyof TEntity = 'id'
> {
	composeRedisKey(id: TEntity[TUniqueKey]): string;

	getCached(id: TEntity[TUniqueKey]): Promise<TEntity | null>;

	cache(entity: TEntity, uniqueKey: TUniqueKey): Promise<void>;

	invalidateCached(uniqueKey: TEntity[TUniqueKey]): Promise<void>;
}
