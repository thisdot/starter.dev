import { Cache } from '../../cache/cache.ts';
import { Technologies } from '../../db/model/technology.ts';

export const getTechnologies = async (
	_p: unknown,
	_: unknown,
	{ ds }: { ds: Cache },
	info: any,
): Promise<Technologies[]> => {
	const cacheTechnologies = await ds.readItem({ cacheKey: info.fieldName });
	if (cacheTechnologies) {
		return cacheTechnologies;
	}
	return ds.writeItem({ cacheKey: info.fieldName }, async () => {
		const technologies = await Technologies.all();
		return technologies;
	});
};

export const getTechnology = async (
	_: unknown,
	{ id }: { id: string },
	{ ds }: { ds: Cache },
	info: any,
) => {
	const cacheTechnology = await ds.readItem({ cacheKey: `${info.fieldName}:${id}` });
	if (cacheTechnology) {
		return cacheTechnology;
	}
	return ds.writeItem({ cacheKey: `${info.fieldName}:${id}` }, async () => {
		const technology = await Technologies.find(id);
		return technology;
	});
};
