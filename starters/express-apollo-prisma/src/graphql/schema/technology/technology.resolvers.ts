import { ServerContext } from '../../server-context/server-context';
import { Resolvers, UpdateTechnology } from '../generated/types';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import { mapTechnology, mapTechnologyCollectionPage } from '../../mappers';

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
		technology: async (_parent, { id }, { dataSources: { technologyDataSource } }) => {
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
		technologies: async (_parent, { limit, offset }, { dataSources: { technologyDataSource } }) => {
			const collectionPage = await technologyDataSource.getTechnologies(limit, offset);
			return mapTechnologyCollectionPage(collectionPage);
		},
	},
	Mutation: {
		createTechnology: async (_parent, { input }, { dataSources }) => {
			const entity = await dataSources.technologyDataSource.createTechnology(input);
			return mapTechnology(entity);
		},
		updateTechnology: async (_parent, { id, input }, { dataSources }) => {
			const idNumber = parseTechnologyId(id);
			if (input.displayName === null) {
				throw new GraphQLError(`Invalid argument property value. Display Name cannot be null.`, {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
						argumentName: 'input',
						propertyName: 'displayName',
						propertyValue: input.displayName,
					},
				});
			}
			const validated = input as ExcludeNullProp<UpdateTechnology, 'displayName'>;
			const entity = await dataSources.technologyDataSource.updateTechnology(idNumber, validated);
			return mapTechnology(entity);
		},
		deleteTechnology: async (_parent, { id }, { dataSources }) => {
			const idNumber = parseTechnologyId(id);
			const entity = await dataSources.technologyDataSource.deleteTechnology(idNumber);
			return Boolean(entity);
		},
	},
};
