# qwik-graphql-tailwind kit

This starter kit features **Qwik**, **GraphQL** and **Tailwind CSS**.

## Table of Contents

-   [Overview](#overview)
    -   [Tech Stack](#tech-stack)
    -   [Included Tooling](#included-tooling)
    -   [Example Components](#example-components)
-   [Installation](#installation)
    -   [CLI](#cli-recommended)
    -   [Manual](#manual)
-   [Commands](#commands)
-   [Demo Implementation](#demo-implementation)

## Overview

### Tech Stack

- [Qwik](https://qwik.builder.io/)
- [GraphQL](https://graphql.org/)
- [Tailwind CSS v3.x](https://tailwindcss.com/)

### Included Tooling

-   [Jest](https://jestjs.io/) - Test runner
-   [Typescript](https://www.typescriptlang.org/) - Type checking
-   [Storybook](https://storybook.js.org/) - Component library
-   [Mock Service Worker](https://mswjs.io/) - Mock REST / GraphQL API
-   [ESLint](https://eslint.org/) - Code linting
-   [Prettier](https://prettier.io/) - Code formatting

### Example Components

In this `starters/qwik-graphql-tailwind/src/routes` directory you will find the `home`, `counter` and `data-fetching` directories.

- `src/routes`: Provides the directory based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.


## Installation

### CLI (Recommended)

```bash
npm create @this-dot/starter --kit qwik-graphql-tailwind
```

or

```bash
yarn create @this-dot/starter --kit qwik-graphql-tailwind
```

-   Follow the prompts to select the `qwik-graphql-tailwind` starter kit and name your new project.
-   `cd` into your project directory and run `yarn`.
-   Run `yarn start` to start the development server.
-   Open your browser to `http://localhost:5173` to see the included example code running.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

-   Copy and rename the `starters/qwik-graphql-tailwind` directory to the name of your new project.
-   `cd` into your project directory and run `yarn`.
-   Run `yarn start` to start the development server.
-   Open your browser to `http://localhost:5173` to see the included example code running.

## Commands

-   `yarn start` - Starts the development server.
-   `yarn build` - Builds a compiled version of your app.
-   `yarn test` - Runs the unit tests.
-   `yarn storybook` - Starts the Storybook UI.
-   `yarn lint` - Runs ESLint on the project.
-   `yarn prettier` - Formats code for the entire project

### Demo Implementation

To Be completed

## Netlify

This starter site is configured to deploy to [Netlify Edge Functions](https://www.netlify.com/products/edge/), which means it will be rendered at an edge location near to your users.

### Local development

The [Netlify CLI](https://docs.netlify.com/cli/get-started/) can be used to preview a production build locally. To do so: First build your site, then to start a local server, run:

1. install Netlify CLI globally `npm i -g netlify-cli`
2. Build your site both ssr and client `npm run build`.
3. Start a local server with `npm run serve`.
   In this project, `npm run serve` uses the `netlify dev` command to spin up a server that can handle Netlify's Edge Functions locally.
4. Visit [http://localhost:8888/](http://localhost:8888/) to check out your site.

### Deployments

You can [deploy your site to Netlify](https://docs.netlify.com/site-deploys/create-deploys/) either via a Git provider integration or through the Netlify CLI. This starter site includes a `netlify.toml` file to configure your build for deployment.

#### Deploying via Git

Once your site has been pushed to your Git provider, you can either link it [in the Netlify UI](https://app.netlify.com/start) or use the CLI. To link your site to a Git provider from the Netlify CLI, run the command:

```shell
netlify link
```

This sets up [continuous deployment](https://docs.netlify.com/site-deploys/create-deploys/#deploy-with-git) for your site's repo. Whenever you push new commits to your repo, Netlify starts the build process..

#### Deploying manually via the CLI

If you wish to deploy from the CLI rather than using Git, you can use the command:

```shell
netlify deploy --build
```

You must use the `--build` flag whenever you deploy. This ensures that the Edge Functions that this starter site relies on are generated and available when you deploy your site.

Add `--prod` flag to deploy to production.
