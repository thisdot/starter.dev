import { GraphqlContext, TechnologyArg } from '../interfaces/graphql_interfaces.ts';
import { ResolveType, Technology } from "../interfaces/codegen.ts";
import { TechnologyRepository } from '../../db/repository/technology_repository.ts';

export const createTechnology = async (
	_parent: unknown,
	{ input }: TechnologyArg,
	{ cache }: GraphqlContext,
): Promise<Technology> => {
	await cache.invalidateItem('getTechnologies');
	return await TechnologyRepository.create({
		...input,
	});
};

export const updateTechnology = async (
	_parent: unknown,
	{ id, input }: TechnologyArg,
	{ cache }: GraphqlContext,
): Promise<ResolveType> => {
	await TechnologyRepository.update(id, {
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
	await TechnologyRepository.deleteById(id);
	await cache.invalidateItem('getTechnologies');
	await cache.invalidateItem(`getTechnology:${id}`);
	return {
		done: true,
	};
};
