export interface CacheAPIWrapper<
	TEntity extends { [k: string]: number | string | null },
	TUniqueKey extends keyof TEntity = 'id'
> {
	composeRedisKey(uniqueKeyValue: TEntity[TUniqueKey]): string;

	getCached(uniqueKeyValue: TEntity[TUniqueKey]): Promise<TEntity | null>;

	cache(entity: TEntity, uniqueKey: TUniqueKey): Promise<void>;

	invalidateCached(uniqueKeyValue: TEntity[TUniqueKey]): Promise<void>;
}
