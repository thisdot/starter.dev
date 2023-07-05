import type { MarkdownContent } from '../types';
import pick from 'just-pick';
import { TECHNOLOGIES, SHOWCASES } from '../config';

export function parseKits(kits: MarkdownContent[]) {
  return kits.map(parseKit);
}

export function parseKit(kit: MarkdownContent) {
  // different shape depending on whether it came from Astro.glob or the content prop
  // TODO: improve this
  const kitData = 'astro' in kit ? kit : kit.frontmatter;
  const keywords = kitData.keywords?.split(',') || [];
  // techstack is created this way to follow the order of the keywords, so the main items show first.
  // needs the undefined filter in case some items (like oak) don't exist in TECHNOLOGIES
  const technologies = keywords
    .map((keyword) => {
      return TECHNOLOGIES.find((tech) => tech.key === keyword);
    })
    .filter((tech) => tech !== undefined);
  const kitObject = pick(kitData, [
    'name',
    'version',
    'description',
    'readmePath',
    'starterPath',
    'hasShowcase',
  ]);
  const showcases = SHOWCASES.filter((showcase) => {
    return showcase.kit === kitObject.name;
  });

  return {
    ...pick(kitData, [
      'name',
      'version',
      'description',
      'readmePath',
      'starterPath',
      'hasShowcase',
    ]),
    technologies,
    showcases,
  };
}
