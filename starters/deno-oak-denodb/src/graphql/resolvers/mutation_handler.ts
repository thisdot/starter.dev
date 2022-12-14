import { GraphqlContext, TechnologyArg } from '../interfaces/graphql_interfaces.ts';
import { Technologies } from '../../db/model/technology.ts';
import { ResolveType, Technology } from "../interfaces/codegen.ts";

export const createTechnology = async (
	_parent: unknown,
	{ input }: TechnologyArg,
	{ cache }: GraphqlContext,
): Promise<Technology> => {
	await cache.invalidateItem('getTechnologies');
	const createdTechnology = await Technologies.create({
		id: crypto.randomUUID(),
		...input,
	});
	return createdTechnology;
};

export const updateTechnology = async (
	_parent: unknown,
	{ id, input }: TechnologyArg,
	{ cache }: GraphqlContext,
): Promise<ResolveType> => {
	await Technologies.where('id', id).update({
		...input,
	});
	await cache.invalidateItem('getTechnologies');
	await cache.invalidateItem(`getTechnology:${id}`);
	return {
		done: true,
	};
};

export const deleteTechnologyById = async (
	_parent: unknown,
	{ id }: TechnologyArg,
	{ cache }: GraphqlContext,
): Promise<ResolveType> => {
	await Technologies.deleteById(id);
	await cache.invalidateItem('getTechnologies');
	await cache.invalidateItem(`getTechnology:${id}`);
	return {
		done: true,
	};
};
