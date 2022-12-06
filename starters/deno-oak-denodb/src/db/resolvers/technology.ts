import { Technologies } from '../model/technology.ts';

interface Technology {
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
    createTechnology: async (_: unknown, { displayName, description, url }: Technology) => {
      const createdTechnology = await Technologies.create({
        displayName,
        description,
        url,
      });
      return createdTechnology;
    },
    updateTechnology: async (_: unknown, { id, value }: { id: string; value: Record<string, string> }) => {
      const updatedTechnology = await Technologies.where('id', id).update({
        ...value,
      });
      return updatedTechnology;
    },
    deleteTechnologyById: async (_: unknown, { id }: any) => {
      await Technologies.deleteById(id);
    },
  },
};
