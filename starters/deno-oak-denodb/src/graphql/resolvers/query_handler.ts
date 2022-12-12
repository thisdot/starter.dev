import { Cache } from '../../cache/Cache.ts';
import { Technologies } from '../../db/model/technology.ts';

export const getTechnologies = async (
	_p: unknown,
	_: unknown,
	{ ds }: { ds: Cache },
	info: any,
): Promise<Technologies[]> => {
	return await ds.cache<Technologies[]>({ cacheKey: info.fieldName }, async () => {
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
	return await ds.cache<Technologies>({ cacheKey: `${info.fieldName}:${id}` }, async () => {
		const technology = await Technologies.find(id);
		return technology;
	});
};
