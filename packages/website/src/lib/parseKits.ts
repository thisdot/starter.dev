import type { MarkdownContent } from '../types';
import pick from 'just-pick';
import { TECHNOLOGIES } from '../config';

export function parseKits(kits: MarkdownContent[]) {
  return kits.map(parseKit);
}

export function parseKit(kit: MarkdownContent) {
  // different shape depending on whether it came from Astro.glob or the content prop
  // TODO: improve this
  const kitData = 'astro' in kit ? kit : kit.frontmatter;
  const keywords = kitData.keywords?.split(',') || [];
  const technologies = TECHNOLOGIES.filter((tech) => {
    return keywords.includes(tech.key);
  });
  return {
    ...pick(kitData, [
      'name',
      'version',
      'description',
      'readmePath',
      'starterPath',
    ]),
    technologies,
  };
}
