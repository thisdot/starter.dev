export const MOCK_TECHNOLOGY_EXPRESS = {
  id: 1,
  name: 'Express.js',
};

export const MOCK_TECHNOLOGY_TYPESCRIPT = {
  id: 2,
  name: 'TypeScript',
};

export const MOCK_TECHNOLOGY_TYPEORM = {
  id: 3,
  name: 'TypeOrm',
};
export const MOCK_TECHNOLOGY_POSTGRES = {
  id: 4,
  name: 'PostgreSQL',
};

export const MOCK_TECHNOLOGIES = [
  MOCK_TECHNOLOGY_EXPRESS,
  MOCK_TECHNOLOGY_TYPESCRIPT,
  MOCK_TECHNOLOGY_TYPEORM,
  MOCK_TECHNOLOGY_POSTGRES,
];

let lastid = 4;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MOCK_TECHNOLOGY_REPOSITORY: any = {
  find: async () => MOCK_TECHNOLOGIES,
  findOne: async ({ where }) => MOCK_TECHNOLOGIES.find((tech) => tech.id === where.id),
  delete: async ({ id }) => {
    const index = MOCK_TECHNOLOGIES.findIndex((tech) => tech.id === id);
    MOCK_TECHNOLOGIES.splice(index, 1);
    return { id };
  },
  insert: async (data) => {
    lastid += 1;
    MOCK_TECHNOLOGIES.push({
      id: lastid,
      name: data.name,
    });
    return { raw: { id: lastid } };
  },
  update: async ({ id }, { name }) => {
    const index = MOCK_TECHNOLOGIES.findIndex((tech) => tech.id === id);
    const newTech = {
      ...MOCK_TECHNOLOGIES[index],
      name,
    };
    MOCK_TECHNOLOGIES.splice(index, 0, newTech);

    return { raw: { id: newTech.id } };
  },
};
