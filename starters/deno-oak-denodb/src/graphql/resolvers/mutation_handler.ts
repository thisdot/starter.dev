import { TechnologyInput } from '../interfaces/graphql_interfaces.ts';
import { Technologies } from '../../db/model/technology.ts';
import { Cache } from '../../cache/cache.ts';

export const createTechnology = async (
	_: unknown,
	{ technology }: { technology: TechnologyInput },
	{ ds }: { ds: Cache },
) => {
	await ds.invalidateItem('getTechnologies');
	const createdTechnology = await Technologies.create({
		id: crypto.randomUUID(),
		...technology,
	});
	return createdTechnology;
};

export const updateTechnology = async (
	_: unknown,
	{ id, input }: { id: string; input: TechnologyInput },
	{ ds }: { ds: Cache },
	info: any,
) => {
	await Technologies.where('id', id).update({
		...input,
	});
	await ds.invalidateItem(`${info.fieldName}:${id}`);
	return {
		done: true,
	};
};

export const deleteTechnologyById = async (
	_: unknown,
	{ id }: { id: string },
	{ ds }: { ds: Cache },
	info: any,
) => {
	await Technologies.deleteById(id);
	await ds.invalidateItem(`${info.fieldName}:${id}`);
	return {
		done: true,
	};
};
