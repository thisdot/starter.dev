# shopify-next-tailwind kit

This starter kit features **Shopify**, **NextJS 13.4** and **Tailwind CSS**.

## Overview

### Tech Stack

- [Shopify](https://shopify.dev/docs)
- [Next.js v13.4.x](https://nextjs.org)
- [Tailwind CSS v3.x](https://tailwindcss.com/)

### Included Tooling

- [Typescript](https://www.typescriptlang.org/) - Type checking
- [Storybook](https://storybook.js.org/) - Component library
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## Installation

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js Commerce. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control your Shopify store.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

If you want to tag and create a release for your project during your development, you could find a GitHub Worflow template example in the [GitHub Workflow folder](./.github/worflows) inside the project.

### CLI (Recommended)

```bash
npm create @this-dot/starter -- --kit shopify-next-tailwind
```

or

```bash
yarn create @this-dot/starter --kit shopify-next-tailwind
```

or

```bash
pnpm create @this-dot/starter --kit shopify-next-tailwind
```

- Follow the prompts to select the `shopify-next-tailwind` starter kit and name your new project.
- `cd` into your project directory and run `pnpm i`.
- Run `pnpm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included template project code running.

### Manual

```bash
git clone https://github.com/thisdot/starter.dev.git
```

- Copy and rename the `starters/shopify-next-tailwind` directory to the name of your new project.
- `cd` into your project directory and run `pnpm i`.
- Run `pnpm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included template project code running.

## Commands

- `pnpm run start` - Starts the development server.
- `pnpm run dev` - Equivalent to `pnpm run start`, but uses `127.0.0.1` instead of `localhost` when opening browser.
- `pnpm run build` - Builds a compiled production version of your app.
- `pnpm run storybook` - Starts the Storybook UI.
- `pnpm run build-storybook` - Builds storybook instance to `storybook-static` folder.
- `pnpm run lint` - Runs ESLint on the project.
- `pnpm run format` - Formats code for the entire project.
- `pnpm run format.check` - Checks all project code to conform to prettier rules.

## How to configure your Shopify store

This template requires a [paid Shopify plan](https://www.shopify.com/pricing).

> Note: This template will not work with a Shopify Starter plan as it does not allow installation of custom themes, which is required to run as a headless storefront.

### Add Shopify domain to an environment variable

Create a `SHOPIFY_STORE_DOMAIN` environment variable and use your Shopify domain as the the value (ie. `[your-shopify-store-subdomain].myshopify.com`).

> Note: Do not include the `https://`.

### Accessing the Shopify Storefront API

This template utilizes [Shopify's Storefront API](https://shopify.dev/docs/api/storefront) to create unique customer experiences. The API offers a full range of commerce options making it possible for customers to control products, collections, menus, pages, cart, checkout, and more.

In order to use the Shopify's Storefront API, you need to install the [Headless app](https://apps.shopify.com/headless) in your Shopify store.

Once installed, you'll need to create a `SHOPIFY_STOREFRONT_ACCESS_TOKEN` environment variable and use the public access token as the value.

> Note: Shopify does offer a Node.js Storefront API SDK. We use the Storefront API via GraphQL directly instead of the Node.js SDK so we have more control over fetching and caching.

## Demo Implementation

---link live---
