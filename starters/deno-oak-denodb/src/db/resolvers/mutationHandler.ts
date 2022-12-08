import { Technologies } from '../model/technology.ts';

export const createTechnology = async (
	_: unknown,
	{ technology: { displayName, description, url } }: any,
) => {
	const createdTechnology = await Technologies.create({
		id: crypto.randomUUID(),
		displayName,
		description,
		url,
	});
	return createdTechnology;
};

export const updateTechnology = async (
	_: unknown,
	{ id, value }: { id: string; value: any },
) => {
	await Technologies.where('id', id).update({
		...value,
	});
	return {
		done: true,
	};
};

export const deleteTechnologyById = async (_: unknown, { id }: any) => {
	await Technologies.deleteById(id);
	return {
		done: true,
	};
};
