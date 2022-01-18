import pick from 'just-pick';
import { TECHNOLOGIES } from '../config';

export function parseKits(kits: any[]) {
  return kits.map(parseKit);
}

export function parseKit(kit) {
  const keywords = kit.keywords.split(',');
  const tech = TECHNOLOGIES.filter((tech) => {
    return keywords.includes(tech.key);
  });
  return {
    ...pick(kit, [
      'name',
      'version',
      'description',
      'readmePath',
      'starterPath',
    ]),
    tech,
  };
}
