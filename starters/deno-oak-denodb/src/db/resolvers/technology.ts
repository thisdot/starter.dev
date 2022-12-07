import { Technologies } from '../model/technology.ts';

export interface ITechnology {
	displayName: string;
	description: string;
	url: string;
}

export const technologyResolvers = {
	Query: {
		getTechnologies: async () => {
			const technologies = await Technologies.all();
			return technologies;
		},
		getTechnology: async (_: unknown, { id }: any) => {
			const technology = await Technologies.find(id);
			return technology;
		},
	},
	Mutation: {
		createTechnology: async (
			_: unknown,
			{ technology: { displayName, description, url } }: any,
		) => {
			const createdTechnology = await Technologies.create({
				id: crypto.randomUUID(),
				displayName,
				description,
				url,
			});
			return createdTechnology;
		},
		updateTechnology: async (
			_: unknown,
			{ id, value }: { id: string; value: ITechnology },
		) => {
			await Technologies.where('id', id).update({
				...value,
			});
			return {
				done: true,
			};
		},
		deleteTechnologyById: async (_: unknown, { id }: any) => {
			await Technologies.deleteById(id);
			return {
				done: true,
			};
		},
	},
};
