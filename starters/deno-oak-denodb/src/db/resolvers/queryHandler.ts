import { Technologies } from '../model/technology.ts';

export const getTechnologies = async () => {
	const technologies = await Technologies.all();
	return technologies;
};

export const getTechnology = async (_: unknown, { id }: any) => {
	const technology = await Technologies.find(id);
	return technology;
};
