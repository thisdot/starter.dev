import { GraphqlContext } from '../interfaces/graphql_interfaces.ts';
import {
	MutationCreateTechnologyArgs,
	MutationDeleteTechnologyByIdArgs,
	MutationUpdateTechnologyArgs,
	ResolveType,
	Technology,
} from '../interfaces/codegen.ts';
import { TechnologyRepository } from '../../db/repository/technology_repository.ts';

export const createTechnology = async (
	_parent: unknown,
	{ input }: MutationCreateTechnologyArgs,
	{ cache }: GraphqlContext,
): Promise<Technology> => {
	await cache.invalidateItem('getTechnologies');
	const technologyModel = await TechnologyRepository.create({
		...input,
	});
	return {
		id: technologyModel.id,
		displayName: technologyModel.displayName,
		description: technologyModel.description,
		url: technologyModel.url,
		createdAt: technologyModel.createdAt,
		updatedAt: technologyModel.updatedAt,
	} as Technology;
};

export const updateTechnology = async (
	_parent: unknown,
	{ id, input }: MutationUpdateTechnologyArgs,
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
	{ id }: MutationDeleteTechnologyByIdArgs,
	{ cache }: GraphqlContext,
): Promise<ResolveType> => {
	await TechnologyRepository.deleteById(id);
	await cache.invalidateItem('getTechnologies');
	await cache.invalidateItem(`getTechnology:${id}`);
	return {
		done: true,
	};
};
