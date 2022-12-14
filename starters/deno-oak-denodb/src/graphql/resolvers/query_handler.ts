import { GraphQLResolveInfo } from '../../../deps.ts';
import { useCache } from '../../cache/use_cache.ts';
import { Technologies } from '../../db/model/technology.ts';
import { GraphqlContext, TechnologyArg } from '../interfaces/graphql_interfaces.ts';
import { TechnologyRepository } from '../../db/repository/technology_repository.ts';

export const getTechnologies = (
	_parent: unknown,
	_args: TechnologyArg,
	{ cache }: GraphqlContext,
	info: GraphQLResolveInfo,
): Promise<Technologies[]> => {
	return useCache<Technologies[]>(info.fieldName, cache, () => {
		return TechnologyRepository.getAll();
	});
};

export const getTechnology = (
	_parent: unknown,
	{ id }: TechnologyArg,
	{ cache }: GraphqlContext,
	info: GraphQLResolveInfo,
): Promise<Technologies> => {
	return useCache<Technologies>(`${info.fieldName}:${id}`, cache, () => {
		return TechnologyRepository.getById(id);
	});
};
