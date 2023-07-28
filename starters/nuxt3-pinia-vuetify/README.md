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

## A note about testing and Storybook

Storybook was not included for this starter.dev kit due to incompatibility with Nuxt.js 3. We will add support when it becomes avaialble.

Vitest and other testing is excluded. The current Nuxt.js 3 testing story is still being developed and is not production ready.

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
- `yarn generate` - Pre-renders every route of your application and stores the result in plain HTML files that you can deploy on any static hosting services. The command triggers the `nuxt build` command with the `prerender` argument set to `true`
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
Configurations are done in the `vuetify.ts` file, which is located in the `plugins` directory. In here is where you will make Vuetify configurations for your application. This particular configuration file exports a Nuxt plugin, defined using defineNuxtPlugin, which applies the Vuetify setup to the Nuxt app.

The file begins by importing the `createVuetify` function from the `Vuetify` library. This function is used later to generate a Vuetify instance for application-wide use. In addition, all Vuetify components and directives are imported for incorporation into this instance, offering broad flexibility for the application's UI.

Within the defined Nuxt plugin, the `createVuetify` function is invoked, establishing a Vuetify configuration object. Notably, server-side rendering (SSR) is enabled by setting `ssr: true` which boosts the performance and SEO of your application.

In terms of theming, a `customTheme` is defined with a primary color of `#3B82F6`. This theme is set as the `defaultTheme`. Remember, theming can be expanded to add more color specifications and other themes, following the same pattern. To learn more: [Layouts and theming in Vuetify 3](https://www.thisdot.co/blog/layouts-and-theming-in-vuetify-3/).

Post-configuration, all components and directives are passed to the `createVuetify` function, ensuring that they're accessible throughout the application.

Finally, the constructed Vuetify instance is applied to the Nuxt application using `nuxtApp.vueApp.use(Vuetify)`. This essential step ensures that Vuetify, with all its components, directives, and theme settings, becomes available in the Vue application.

In essence, this file outlines a pattern to configure Vuetify within a Nuxt.js context, making optimal use of theme customization and SSR, while incorporating all available Vuetify components and directives.

## Deployment

The `build` command creates a working Nuxt 3 app, so you can deploy it to any hosting provider that supports Nuxt.js.

Deploying to [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com) is as easy as hooking up your repository to the service and let the service auto detect the next app and configure it for you.
