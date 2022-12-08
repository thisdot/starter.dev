import { TechnologyInput } from '../interfaces/graphql_interfaces.ts';
import { Technologies } from '../../db/model/technology.ts';

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
) => {
	await Technologies.where('id', id).update({
		...input,
	});
	return {
		done: true,
	};
};

export const deleteTechnologyById = async (_: unknown, { id }: { id: string }) => {
	await Technologies.deleteById(id);
	return {
		done: true,
	};
};
