import { GraphQLResolveInfo } from '../../../deps.ts';
import { useCache } from '../../cache/use_cache.ts';
import { Technology } from '../interfaces/codegen.ts';
import { GraphqlContext, TechnologyArg } from '../interfaces/graphql_interfaces.ts';
import { TechnologyRepository } from '../../db/repository/technology_repository.ts';

export const getTechnologies = (
	_parent: unknown,
	_args: unknown,
	{ cache }: GraphqlContext,
	info: GraphQLResolveInfo,
): Promise<Technology[]> => {
	return useCache<Technology[]>(info.fieldName, cache, () => {
		return TechnologyRepository.getAll();
	});
};

export const getTechnology = (
	_parent: unknown,
	{ id }: Pick<TechnologyArg, 'id'>,
	{ cache }: GraphqlContext,
	info: GraphQLResolveInfo,
): Promise<Technology> => {
	return useCache<Technology>(`${info.fieldName}:${id}`, cache, () => {
		return TechnologyRepository.getById(id);
	});
};
