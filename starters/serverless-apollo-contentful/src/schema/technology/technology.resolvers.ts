import { Resolvers, Technology } from '../../generated/graphql';
import { TechnologyModel } from '../../models/TechnologyModel';
import { Entry } from 'contentful-management';

const entryToTechnology = (entry: Entry): Technology => {
	return {
		id: entry.sys.id,
		displayName: entry.fields.displayName['en-US'],
		description: entry.fields.description['en-US'],
		url: entry.fields.url['en-US'],
	};
};
export const technologyResolvers: Resolvers = {
	Query: {
		technology: async (_parent, { id }) => {
			if (id) {
				const entry = await TechnologyModel.get(id);
				return [entryToTechnology(entry)];
			}

			const entryList = await TechnologyModel.getAll();

			return entryList.map(entryToTechnology);
		},
	},
	Mutation: {
		createTechnology: async (_parent, fields) => {
			const entry = await TechnologyModel.create(fields);

			return entryToTechnology(entry);
		},

		updateTechnology: async (_parent, { id, ...fields }) => {
			const entry = await TechnologyModel.update(id, fields);

			return entryToTechnology(entry);
		},
	},
};
