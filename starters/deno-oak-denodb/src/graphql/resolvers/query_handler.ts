import { GraphQLResolveInfo } from '../../../deps.ts';
import { useCache } from '../../cache/use_cache.ts';
import { QueryTechnologyArgs, Technology } from '../interfaces/codegen.ts';
import { GraphqlContext } from '../interfaces/graphql_interfaces.ts';
import { TechnologyRepository } from '../../db/repository/technology_repository.ts';
import { TechnologyModel } from '../../db/model/technology_model.ts';

/**
 * GraphQL query handler for getting all technologies in the database.
 *
 * @param _parent (Unused) the response of the previous resolver
 * @param _args (Unused) the arguments provided to the resolver
 * @param cache Cache to populate
 * @param info GraphQL resolve info
 */
export const technologies = async (
	_parent: unknown,
	_args: unknown,
	{ cache }: GraphqlContext,
	info: GraphQLResolveInfo,
): Promise<Technology[]> => {
	return await useCache<Technology[]>(info.fieldName, cache, async () => {
		const technologies = await TechnologyRepository.getAll();
		return technologies.map((technology: TechnologyModel) => {
			return {
				id: technology.id,
				displayName: technology.displayName,
				description: technology.description,
				url: technology.url,
				createdAt: technology.createdAt,
				updatedAt: technology.updatedAt,
			} as Technology;
		});
	});
};

/**
 * GraphQL query handler for getting a single technology from the database.
 *
 * @param _parent (Unused) the response of the previous resolver
 * @param id ID of the technology to get
 * @param cache Cache to read from
 * @param info GraphQL resolve info
 */
export const technology = async (
	_parent: unknown,
	{ id }: QueryTechnologyArgs,
	{ cache }: GraphqlContext,
	info: GraphQLResolveInfo,
): Promise<Technology> => {
	return await useCache<Technology>(`${info.fieldName}:${id}`, cache, async () => {
		const technology = await TechnologyRepository.getById(id);
		return {
			id: technology.id,
			displayName: technology.displayName,
			description: technology.description,
			url: technology.url,
			createdAt: technology.createdAt,
			updatedAt: technology.updatedAt,
		} as Technology;
	});
};
