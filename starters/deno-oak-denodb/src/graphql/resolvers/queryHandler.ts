import { Technologies } from '../../db/model/technology.ts';

export const getTechnologies = async () => {
	const technologies = await Technologies.all();
	return technologies;
};

export const getTechnology = async (_: unknown, { id }: { id: string }) => {
	const technology = await Technologies.find(id);
	return technology;
};
