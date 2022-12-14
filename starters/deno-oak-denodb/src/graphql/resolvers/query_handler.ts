import { GraphQLResolveInfo } from '../../../deps.ts';
import { useCache } from '../../cache/use_cache.ts';
import { Technologies } from '../../db/model/technology.ts';
import { GraphqlContext, TechnologyArg } from '../interfaces/graphql_interfaces.ts';
import { TechnologyRepository } from '../../db/repository/technology_repository.ts';

export const getTechnologies = async (
	_parent: unknown,
	_args: TechnologyArg,
	{ cache }: GraphqlContext,
	info: GraphQLResolveInfo,
): Promise<Technologies[]> => {
	return await useCache<Technologies[]>(info.fieldName, cache, async () => {
		return await TechnologyRepository.getAll();
	});
};

export const getTechnology = async (
	_parent: unknown,
	{ id }: TechnologyArg,
	{ cache }: GraphqlContext,
	info: GraphQLResolveInfo,
): Promise<Technologies> => {
	return await useCache<Technologies>(`${info.fieldName}:${id}`, cache, async () => {
		return await TechnologyRepository.getById(id);
	});
};
