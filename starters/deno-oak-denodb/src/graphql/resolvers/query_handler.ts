import { GraphQLResolveInfo } from '../../../deps.ts';
import { useCache } from '../../cache/use_cache.ts';
import { Technologies } from '../../db/model/technology.ts';
import { GraphqlContext, TechnologyArg } from '../interfaces/graphql_interfaces.ts';

export const getTechnologies = async (
	_parent: unknown,
	_args: TechnologyArg,
	{ cache }: GraphqlContext,
	info: GraphQLResolveInfo,
): Promise<Technologies[]> => {
	return await useCache<Technologies[]>(info.fieldName, cache, async () => {
		const technologies = await Technologies.all();
		return technologies;
	});
};

export const getTechnology = async (
	_parent: unknown,
	{ id }: TechnologyArg,
	{ cache }: GraphqlContext,
	info: GraphQLResolveInfo,
): Promise<Technologies> => {
	return await useCache<Technologies>(`${info.fieldName}:${id}`, cache, async () => {
		const technology = await Technologies.find(id);
		return technology;
	});
};
