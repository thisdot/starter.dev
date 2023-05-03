# starter.dev

[starter.dev](https://starter.dev/) is a set of zero-configuration frontend and backend kits built with essential tools including TypeScript, testing, linting, Storybook, and more. You can generate a new project within minutes by running `npx @this-dot/create-starter` and choosing a kit from the list.

This GitHub repository is a monorepo for the [starter.dev](https://starter.dev/) project. Here are the main directories:

- `/packages` - Includes the starter.dev website and CLI
- `/starters` - Directory of all starter kit projects
- `/scripts` - Includes the code that validates the `starter-kits.json` file

## Table of contents

- [How to run the scaffolding script](#how-to-run-the-scaffolding-script)
- [Approval process for a new starter kit](#approval-process-for-a-new-starter-kit)
- [Feature branches for starter kits](#feature-branches-for-starter-kits)
- [Starter kit naming convention](#starter-kit-naming-convention)
- [How to add a new starter kit](#how-to-add-a-new-starter-kit)
- [Starter kit essentials](#starter-kit-essentials)
  - [`package.json` requirements](#packagejson-requirements)
  - [Pinned Dependency Versions](#pinned-dependency-versions)
  - [.nvmrc files](#nvmrc-files)
  - [Code formatting and linting](#code-formatting-and-linting)
  - [Testing](#testing)
  - [README file structures](#readme-file-structures)
- [Essentials for Frontend kits](#essentials-for-frontend-kits)
  - [State management](#state-management)
  - [Styling](#styling)
  - [Example Components](#example-components)
  - [Storybook](#storybook)
- [Essentials for Backend kits](#essentials-for-backend-kits)
  - [Data Stores](#data-stores)
  - [CORS configuration](#cors-configuration)
  - [API Implementation and documentation](#api-implementation-and-documentation)
- [Adding a starter kit to the website](#adding-a-starter-kit-to-the-website)
- [Adding a starter kit to the CLI](#adding-a-starter-kit-to-the-cli)
- [How to report an issue with the site or a starter kit](#how-to-report-an-issue-with-the-site-or-a-starter-kit)
- [How to get started contributing to starter.dev](#how-to-get-started-contributing-to-starterdev)

## How to run the scaffolding script

1. Run `npx @this-dot/create-starter` in the command line
2. Select a starter kit
3. Name your project
4. `cd` into your new project
5. Install the dependencies (`npm install`, `yarn`, etc.)

## Approval process for a new starter kit

If you have an idea for a new starter kit, please open up a new [issue](https://github.com/thisdot/starter.dev/issues/new?assignees=&labels=New+Issue%2C+feature&template=feature_request.yml&title=%5BFeature%5D%3A+) and provide all of the necessary details(framework, state management, styling, etc.) for the kit. Once the issue has been created, one of the core team members will get back to you.

## Feature branches for starter kits

Once your kit is approved, then you will need to create a new feature branch. (Ex. `feat/nuxt3-pinia-vuetify-kit`). You can then start to break up your work in the following [tickets](https://github.com/thisdot/starter.dev/tree/main/.github/custom-issue-template). Once the kit is built and approved, then you can merge your feature branch into main.

## Starter kit naming convention

The name of a starter kit should highlight the core technologies that it uses and that differentiate it from other starter kits. For example: `next12-react-query-tailwind` - _framework: next, state management: react-query, styling: tailwind_.

## How to add a new starter kit

Starter kits live at `starters/:name` in this repository. After adding a new starter kit, please run `yarn generate-starter-kits-json` to update the [starter-kits.json](./starter-kits.json) file.

## Starter kit essentials

All starter kits should include a set of frameworks, libraries, and essential tooling as well as core examples that utilize the tech included in the kit.

### `package.json` requirements

For proper integration with the starter-dev CLI and website there are also some requirements and conventions to follow in the starter kit's `package.json` file.

- `description` - This field is used as a short description highlighting the technologies of each particular starter kit. It is shown as a selection in the starter-dev CLI. Example: `NextJS, React Query, and TailwindCSS`
- `keywords` - This field is an array of strings used to map to the technology list on the starter.dev website. Example: `["next", "react-query", "tailwind"]`
- `hasShowcase` - This field is a boolean and is required when displaying the "View Showcase" link for kits that have showcases. If your kit has a showcase, set the value to `true`. If your kit does not have a showcase, set the value to `false`.

### Pinned Dependency Versions

All kits will need to pin the dependency version numbers because there are no lockfiles.

```json
"dependencies": {
		"@apollo/server": "4.3.0",
		"@apollo/utils.keyvadapter": "2.0.0",
		"@as-integrations/aws-lambda": "1.2.1",
}
```

### .nvmrc files

A .nvmrc file should be provided with the kit to specify the node version used to ensure users are using the targeted node version.

### Code formatting and linting

All starter kits will need to include [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), and an [EditorConfig](https://editorconfig.org/) to help enforce consistency throughout the project.

### Testing

All starter kits should have testing configured with a couple of sample tests included. Testing options can include the following:

- [Jest](https://jestjs.io/)
- [Vitest](https://vitest.dev/)
- [Cypress](https://www.cypress.io/)
- [Playwright](https://playwright.dev/)

### README file structures

All README files should include the following sections:

- Instructions for installing the kit
- How to use this Starter Kit
- Prerequisites
- Available Commands
- Tech Stack
- Included Tooling
- Kit Organization / Architecture
- Testing
- Styling and Theme(Frontend kits only)
- Instructions for seeding the database (Backend kits only)
- Deployment

**WARNING**: Please do not add any comments to the README files. Comments in the markdown will cause the website builds to fail.

You can view the following examples for ideas on how to structure your README.

- [deno-oak-denodb starter kit](https://starter.dev/kits/deno-oak-denodb/)
- [nextjs12-chakra-ui starter kit](https://starter.dev/kits/next12-chakra-ui/)
- [express-typeorm-postgres starter kit](https://starter.dev/kits/express-typeorm-postgres/)

## Essentials for Frontend kits

### State management

All frontend kits should have configurations and well documented patterns in the README for using state management.

Some examples can include the following:

- [Apollo Client](https://www.apollographql.com/docs/react/)
- [RxJS](https://rxjs.dev/)
- [NgRX](https://ngrx.io/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Tanstack Query](https://tanstack.com/query/latest)

### Styling

All frontend kits should have configurations and well documented patterns in the README for using a preprocessor language, component library, utility framework or vanilla CSS styling.

Some examples can include the following:

- [Tailwind CSS](https://tailwindcss.com/)
- [Chakra UI](https://chakra-ui.com/)
- [Sass](https://sass-lang.com/)
- [Styled Components](https://styled-components.com/)

### Example Components

All frontend kits will need to include the following example components:

- Counter component - A component that can increment, decrement, and reset a counter to 0 should be included. The counter should work in the negative direction as well.
- Fetch component - A component that fetches data from `https://api.starter.dev/.netlify/functions/server/hello` or `https://api.starter.dev/.netlify/functions/graphql` depending on the API design used. The message should be customizable.

### Storybook

[Storybook](https://storybook.js.org/) should be installed and configured to test your UI components and pages in isolation. All default stories should be removed and new stories should be added and collocated to their components.

It is also encouraged to browse the list of available [Storybook integrations](https://storybook.js.org/integrations) and see if one of them would be a nice addition to your kit.

## Essentials for Backend kits

### Data Stores

All backend kits will need to define a data store and caching database like Redis or Memcache. This will include configuring Docker and setting up the data seeding and model. The data models should perform basic CRUD operations.

### CORS configuration

CORS should be enabled so developers can test from anywhere. Notes on how to configure CORS for deployed instances should be included in the README.

### API Implementation and documentation

The basic API implementation should cover the following:

- Fetch all records
- Create record
- Fetch record
- Update record
- Delete record

In addition to the implementation, API documentation should be configured and well documented in the README. Some examples might include [Swagger](https://swagger.io/tools/swagger-ui/) or [ReDoc](https://redocly.com/redoc/).

## Adding a starter kit to the website

The `keyword` field in your starter kit's `package.json` categorizes/tags each starter kit on the website. For a reference of the keys that should be used here take a look at the`package/website/src/config.tsx` file. If a particular technology you're needing is missing from the`TECHNOLOGIES` list, please open a PR to add it including an icon _(if available)_.

Once you've added your description, keywords, and made sure the keywords exist in the `TECHNOLOGIES` list in the websites `config.tsx` file, your starter kit will automatically be added to the website and deployed once you merge into the `main` branch.

## Adding a starter kit to the CLI

To add your starter kit to the starter.dev CLI, you'll need to add an entry to the `starter-kits.json` file in the root directory of this repo. The key should be your starter kits package/directory name, and the value should be it's package.json `description` field. Look at current items as an example.

## How to report an issue with the site or a starter kit

If you find a bug on the [starter.dev](https://starter.dev/) site or with one of the starter kits, create a new issue using the [bug report template](https://github.com/thisdot/starter.dev/issues/new?assignees=&labels=New+Issue%2C+bug&template=bug_report.yml&title=%5BBug%5D%3A+). Please make sure to include all of the necessary information and one of the core team members will get back to.

## How to get started contributing to starter.dev

If you are interested in contributing, please read through our [Code of Conduct](https://github.com/thisdot/starter.dev/blob/main/CODE_OF_CONDUCT.md) and [Contributing](https://github.com/thisdot/starter.dev/blob/main/CONTRIBUTING.md) documentation. You can look for open issues marked with the `good-first-issue` and `help-wanted` labels.

If you need help with anything, please reach out on our [Discord server](https://discord.gg/38TeYEZM).
