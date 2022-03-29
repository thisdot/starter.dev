const generateHeaderAnchor = (name: string) => {
  const names = name.split(' ');
  return names.join('-').toLowerCase();
};

export { generateHeaderAnchor };
