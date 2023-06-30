const path = require('path');
const fs = require('fs/promises');
const pick = require('just-pick');
const rimraf = require('rimraf');
const { getRepoRootPath, getKitDirs } = require('../../../scripts/kits-utils');

const KIT_PAGE_RELATIVE_LAYOUT_PATH = '../../layouts/KitLayout.astro';

function convertToFrontmatter(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `${key}: ${obj[key]}`)
    .join('\n');
}

function formatMarkdownFile(markdown, frontmatter) {
  return `---
# generated by scripts/kitgen at ${new Date().toISOString()}
# edit KIT_PAGE_RELATIVE_LAYOUT_PATH in scripts/kitgen to change layout
layout: ${KIT_PAGE_RELATIVE_LAYOUT_PATH}
${frontmatter}
---

${markdown}`;
}

async function createDeleteFiles(isKit, PagesPath) {
  try {
    const handle = await fs.opendir(PagesPath);
    console.info(
      isKit
        ? 'kitgen: deleting existing kit pages'
        : 'showcasegen: deleting existing showcase file'
    );
    rimraf(
      isKit ? `${PagesPath}/*.md,${PagesPath}/*.mdx` : `${PagesPath}/*`,
      async (err) => {
        if (err) {
          console.error(err);
        }
        await handle.close();
      }
    );
  } catch (err) {
    if (err && err.code === 'ENOENT') {
      console.info(
        isKit
          ? 'kitgen: creating kit pages directory'
          : 'showcasegen: creating showcase file'
      );
      await fs.mkdir(PagesPath);
    }
  }
}

async function generate(isKit, genPath) {
  const repoPath = getRepoRootPath();
  const PagesPath = path.join(repoPath, genPath);
  await createDeleteFiles(isKit, PagesPath);

  const kitDirs = await getKitDirs();
  const showcases = [];
  let pickData;
  let formattedMarkdown;
  let PagePath;

  console.info(
    isKit ? 'kitgen: generating kit pages' : 'showcasegen: generating showcases'
  );
  for (const dir of kitDirs) {
    const kitPath = path.join(repoPath, 'starters', dir);

    let infoFile = 'package.json';
    if (dir.startsWith('deno-')) {
      // For Deno, we don't have package.json
      infoFile = 'deno.json';
    }

    try {
      const readme = await fs.readFile(
        path.join(kitPath, 'README.md'),
        'utf-8'
      );
      const json = await fs.readFile(path.join(kitPath, infoFile), 'utf-8');
      const data = JSON.parse(json);

      if (isKit) {
        pickData = {
          ...pick(data, [
            'name',
            'version',
            'description',
            'keywords',
            'hasShowcase',
          ]),
          readmePath: path.join(kitPath, 'README.md'),
          starterPath: `/starters/${dir}`,
        };
        const frontmatter = convertToFrontmatter(pickData);
        formattedMarkdown = formatMarkdownFile(readme, frontmatter);
        PagePath = path.join(
          repoPath,
          'packages/website/src/pages/kits',
          `${data.name}.mdx`
        );
      } else {
        pickData = {
          ...pick(data, ['showcase']),
        };
        Object.entries(pickData).map(([key, value]) => {
          value.map((item) => {
            showcases.push(item);
          });
        });
        PagePath = path.join(
          repoPath,
          'packages/website/src/showcases/showcases.json'
        );
      }

      await fs.writeFile(
        PagePath,
        isKit ? formattedMarkdown : JSON.stringify(showcases),
        'utf-8'
      );
    } catch (err) {
      console.error(
        isKit
          ? `KITGEN: failed to write kit page for ${dir}: ${err.message}`
          : `SHOWCASEGEN: failed to write showcase page: ${err.message}`
      );
    }
  }
}

module.exports = {
  generate,
};
