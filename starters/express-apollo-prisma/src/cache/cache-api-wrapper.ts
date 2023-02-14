export abstract class CacheAPIWrapper {
	protected constructor(public readonly keyPrefix: string) {}

	abstract composeRedisKey<
		TEntity extends { [k: string]: number | string },
		TUniqueKey extends keyof TEntity = 'id'
	>(id: TEntity[TUniqueKey]): string;

	abstract getCached<
		TEntity extends { [k: string]: number | string },
		TIdKey extends keyof TEntity = 'id'
	>(id: TEntity[TIdKey]): Promise<TEntity | null>;

	abstract cache<
		TItem extends { [k: string]: number | string },
		TUniqueKey extends keyof TItem = 'id'
	>(item: TItem, uniqueKey: TUniqueKey): Promise<void>;

	abstract invalidateCached<
		TItem extends { [k: string]: number | string },
		TUniqueKey extends keyof TItem = 'id'
	>(uniqueKey: TItem[TUniqueKey]): Promise<void>;
}
