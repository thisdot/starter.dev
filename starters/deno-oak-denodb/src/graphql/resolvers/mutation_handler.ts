import { GraphqlContext } from '../interfaces/graphql_interfaces.ts';
import {
	MutationCreateTechnologyArgs,
	MutationDeleteTechnologyByIdArgs,
	MutationUpdateTechnologyArgs,
	ResolveType,
	Technology,
} from '../interfaces/codegen.ts';
import { TechnologyRepository } from '../../db/repository/technology_repository.ts';

const thumbnailWorker = new Worker(new URL("../../worker/worker.ts", import.meta.url).href, { type: "module" });
/**
 * GraphQL mutation handler for creating a new technology instance.
 *
 * @param _parent (Unused) the response of the previous resolver
 * @param input Input data
 * @param cache Cache to invalidate
 */
export const createTechnology = async (
	_parent: unknown,
	{ input }: MutationCreateTechnologyArgs,
	{ cache }: GraphqlContext,
): Promise<Technology> => {
	await cache.invalidateItem('getTechnologies');
	const technologyModel = await TechnologyRepository.create({
		...input,
	});

	// Generate thumbnails asynchronously in a separate thread
	thumbnailWorker.postMessage({imageUrl: input.imageUrl})

	return {
		id: technologyModel.id,
		displayName: technologyModel.displayName,
		description: technologyModel.description,
		url: technologyModel.url,
		createdAt: technologyModel.createdAt,
		updatedAt: technologyModel.updatedAt,
	} as Technology;
};

/**
 * GraphQL mutation handler for updating an existing technology instance.
 *
 * @param _parent (Unused) the response of the previous resolver
 * @param id ID of the technology to update
 * @param input Input data
 * @param cache Cache to invalidate
 */
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

/**
 * GraphQL mutation handler for deleting an existing technology instance.
 *
 * @param _parent (Unused) the response of the previous resolver
 * @param id ID of the technology to delete
 * @param cache Cache to invalidate
 */
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
