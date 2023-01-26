import { ServerContext } from '../../server-context/server-context';
import { Resolvers, UpdateTechnology } from '../generated/types';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import { mapTechnology } from '../../mappers';

const parseTechnologyId = (id: string): number => {
	const idNumber = Number(id);
	if (isNaN(idNumber)) {
		throw new GraphQLError(`Invalid argument value`, {
			extensions: {
				code: ApolloServerErrorCode.BAD_USER_INPUT,
				argumentName: 'id',
			},
		});
	}
	return idNumber;
};

type ExcludeNullProp<T extends Record<string, unknown>, TKey extends keyof T> = {
	[Key in keyof T]: Key extends TKey ? Exclude<T[Key], null> : T[Key];
};

export const technologyResolvers: Resolvers<ServerContext> = {
	Query: {
		technology: async (_, { id }, { dataSources: { technologyDataSource } }) => {
			const idNumber = parseTechnologyId(id);
			const entity = await technologyDataSource.getTechnologyById(idNumber);
			if (!entity) {
				throw new GraphQLError('Technology not found.', {
					extensions: {
						code: ApolloServerErrorCode.PERSISTED_QUERY_NOT_FOUND,
					},
				});
			}
			return mapTechnology(entity);
		},
		technologies: async (_, {}, { dataSources: { technologyDataSource } }) => {
			const entities = await technologyDataSource.getTechnologies();
			return entities.map(mapTechnology);
		},
	},
	Mutation: {
		createTechnology: async (_, { input }, { dataSources }) => {
			const entity = await dataSources.technologyDataSource.createTechnology(input);
			return mapTechnology(entity);
		},
		updateTechnology: async (_, { id, input }, { dataSources }) => {
			const idNumber = parseTechnologyId(id);
			if (input.name === null) {
				throw new GraphQLError(`Invalid argument property value. Name cannot be null.`, {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
						argumentName: 'input',
						propertyName: 'name',
						propertyValue: input.name,
					},
				});
			}
			const validated = input as ExcludeNullProp<UpdateTechnology, 'name'>;
			const entity = await dataSources.technologyDataSource.updateTechnology(idNumber, validated);
			return mapTechnology(entity);
		},
		deleteTechnology: async (_, { id }, { dataSources }) => {
			const idNumber = parseTechnologyId(id);
			const entity = await dataSources.technologyDataSource.deleteTechnology(idNumber);
			return Boolean(entity);
		},
	},
};
