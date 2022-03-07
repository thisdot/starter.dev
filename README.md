# starter.dev

## Adding a starter kit

Starter kits live at `starters/:name` in this repository.

### Starter kit naming convention

The name of a starter kit should highlight the core technologies that it uses and that differentiate it from other starter kits. In example: `next-react-query-tailwind` - _framework: next, state management: react-query, styling: tailwind_.

### `package.json` requirements

For proper integration with the starter-dev CLI and website there are also some requirements and convention to follow in the starter kit's `package.json` file.

- `description` - This field is used as a short description highlighting the technologies of each particular starter kit. It is shown as a selection in the starter-dev CLI. Example: `NextJS, React Query, and TailwindCSS`
- `keywords` - This field is an array of strings used to map to the technology list on the starter.dev website. This categorizes/tags each starter kit on the website. For a reference of the keys that should be used here take a look at the `package/website/src/config.tsx` file. If a particular technology you're needing is missing from the `TECHNOLOGIES` list, please open a PR to add it including an icon if possible. Example: `["next", "react-query", "tailwind"]`
