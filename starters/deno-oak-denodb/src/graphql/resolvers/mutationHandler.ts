import { TechnologyInput } from '../interfaces/graphql_interfaces.ts';
import { Technologies } from '../../db/model/technology.ts';
import { Cache } from '../../cache/Cache.ts';

export const createTechnology = async (
	_: unknown,
	{ technology }: { technology: TechnologyInput },
) => {
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
	await ds.deleteCache(`${info.fieldName}:${id}`);
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
	await ds.deleteCache(`${info.fieldName}:${id}`);
	return {
		done: true,
	};
};
