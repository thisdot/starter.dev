# nuxt3-pinia-vuetify starter kit

This starter kit features **Nuxt.js 3**, **Pinia** for client-side state management, and **Vuetify** for styling.

##### How to use this Starter Kit:

```bash
npm create @this-dot/starter -- --kit nuxt3-pinia-vuetify
```

<sub>(use any of `npm` / `yarn` / `pnpm`)</sub>

## Tech Stack

- [Nuxt.js v3.x](https://nuxt.com/)
- [Pinia v2.x](https://pinia.vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)

#### Included Tooling

- [Vue v3.x](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Sass](https://sass-lang.com/guide) - CSS preproccesor
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## A note about testing

We didn't include Storybook in this starter kit because it is not yet compatible with Nuxt.js 3. We will add it back in when it is. Likewise, we didn't include tests because the testing story for Nuxt.js 3 is still being worked out and it's not production ready.

## Getting Started

#### Prerequisites

- [Node.js 16.8](https://nodejs.org/) or later installed

#### Development

- start by [creating a new Starter Kit](https://starter.dev/) project
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

## Available Commands

- `yarn dev` / `yarn start` - Starts the development server.
- `yarn build` - Creates a `.output` directory with all your application, server and dependencies ready for production.
- `yarn preview` - Starts a server to preview your Nuxt application after running the build command.
- `yarn generate` - Pre-renders every route of your application and stores the result in plain HTML files that you can deploy on any static hosting services. The command triggers the `nuxi build` command with the `prerender` argument set to `true`
- `yarn postinstall` - Creates a `.nuxt` directory in your application and generates types. This can be useful in a CI environment or as a `postinstall` command in your `package.json`.
- `yarn lint:js` - Runs ESLint on the project.
- `yarn lint:prettier` - Runs Prettier on the project.
- `yarn lint` - Runs both `yarn lint:js` and `yarn lint:prettier`.
- `yarn lint:fix` - Runs ESLint and Prettier on the project and fixes any errors.

## Project Details

### Kit Organization / Architecture

We've chosen to split out a `components` directory for interactive UI components, and a `store` directory for the Pinia stores used for both global and some component state management.

In this `nuxt3-pinia-vuetify` kit you will find the `CounterExample` and `FetchExample` directories in the components folder.

The `CounterExample` directory component uses `Pinia` to control the state of the component.

The `FetchExample` directory component uses `useLazyFetch` to fetch data from the example `hello endpoint`.

## Styling and Theme

The project uses [Vuetify](https://vuetifyjs.com/en/) as the main styling framework. Vuetify is a powerful Vue Component Framework built from the ground up to be easy to learn and rewarding to master. Our collection of UI components maintain a consistent style throughout your application with enough customization options to meet any use-case.

Configurations are done in the `vuetify.ts` file, which is located in the `plugins` directory. Vuetify component, directives, themes and more configuration can be added here.

## Deployment

The `build` command creates a working Nuxt 3 app, so you can deploy it to any hosting provider that supports Nuxt.js.

Deploying to [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com) is as easy as hooking up your repository to the service and let the service auto detect the next app and configure it for you.
