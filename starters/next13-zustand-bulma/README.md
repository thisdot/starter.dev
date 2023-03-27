# next13-zustand-bulma Starter Kit

This starter kit features [**Next.js 13+**](https://beta.nextjs.org/docs) (with the `appDir` and server components), [**Zustand**](https://zustand-demo.pmnd.rs/) for client-side state management, and [**Bulma**](https://bulma.io/) for styling.

> **Note**: Our api example do not have unit tests nor Storybook stories, this is due to the fact that we are using server components. Storybook does not support them yet, and for unit tests, we do not have an official or recommended way to test server components. We are working on it, and will update this starter kit when we have a solution.

##### How to use this Starter Kit:

```bash
npm create @this-dot/starter -- --kit next13-zustand-bulma
```

<sub>(use any of `npm` / `yarn` / `pnpm`)</sub>

_[(...or use one of our alternative setup instructions)](https://github.com/thisdot/starter.dev/wiki/Setup:-next13%E2%80%93zustand%E2%80%93bulma)_

## Tech Stack

- [Next.js v13.x](https://nextjs.org) - full-stack web application framework built on React
- [Zustand v4.x](https://zustand-demo.pmnd.rs/) - state-management solution
- [Bulma](https://bulma.io/) - styling framework built with Sass

#### Included Tooling

- [React v18.x](https://reactjs.org) - component framework (included with Next.js)
- [TypeScript v4](https://www.typescriptlang.org/) - Type checking
- [Sass](https://sass-lang.com/guide) - CSS preproccesor
- [Jest](https://jestjs.io/) - Test runner
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - utility functions for testing React components
- [Storybook v7](https://storybook.js.org/) - Component sandbox and docs
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## Getting Started

#### Prerequisites

- [Node.js 16.8](https://nodejs.org/) or later installed
- An experimental state of mind

#### Development

- start by [creating a new Starter Kit](https://github.com/thisdot/starter.dev/wiki/Setup:-next13%E2%80%93zustand%E2%80%93bulma) project
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

## Available Commands

- `npm run dev` - starts application in development mode.
- `npm run build` - builds the application for production usage
- `npm run start` - start a production server for the application
- `npm run lint` - runs ESLint on the project.
- `npm run format` - formats code for the entire project
- `npm run test` - runs the unit tests.
- `npm run storybook` - starts the Storybook UI.
- `npm run build-storybook` - build Storybook as a static web application

## Project Details

### Kit Organization / Architecture

> **Note**: The Next.js App Router, which this starter kit uses, is currently in beta and we do not recommend using it in production.

This Kit uses new Next13 features, such as [`AppDir` router](https://beta.nextjs.org/docs/routing/fundamentals#the-app-directory) and [server components](https://beta.nextjs.org/docs/rendering/server-and-client-components).

We've chose to split out a `components` directory for interactive UI components, and a `store` directory for the Zustand stores used for both global and some component state management.

This allows us to keep the `app` directory focused on routing, layouts, and loading data, while passing that data to the more interactive components with more complex needs.

### Styling and Theme

The project uses [Bulma](https://bulma.io/) as the main styling framework. Bulma offers a way to "theme" their components and utility classes by overriding their default SASS variables.

Overrides are done in the `base-styles.scss` file, which is imported in the `src/app/global.scss` file. Bulma components and utility classes can be added to components as needed as they are included in the `global.scss` file, which in turn is imported in the root layout.

You should import the `base-styles.scss` file in any component `*.module.scss` file, as per the example in `app/counter-example.page.tsx` to have access to the [Bulma variables](https://bulma.io/documentation/customize/variables/) for color and spacing in your component.

Bulma is added to Storybook using the [`@storybok/addon-styling` package](https://storybook.js.org/addons/@storybook/addon-styling) which is the recommended way to add unsupported style frameworks to Storybook.

There is some code included to prevent Storybook's `Source` component from picking up styles from the Bulma `tag` component class. The explanation and solution can be found in [this pr](https://github.com/thisdot/starter.dev/pull/1186).

### Font Loading

It takes advantage of the new [`next/font` package](https://beta.nextjs.org/docs/optimizing/fonts) for optimal font loading, and uses the [`@storybook/addon-styling` package](https://storybook.js.org/addons/@storybook/addon-styling), to provide the same font loading functionality to Storybook.

### Colocation in directories

Sometimes called "feature folders", or "modlets", this kit follows the convention of grouping related files together in a directory regardless of filetype or extension. This makes it easier to find related files, and makes it easier to move files around without breaking imports. We also use the `index.ts` file to export some of the modules in the directory, so that we can import them from the directory path instead of the individual files: this is sometimes called a "Barrel" file.

```
- UserRepos.test.tsx - Unit tests for the UserRepos component
- UserRepos.stories.tsx - Storybook UI for the UserRepos component
- UserRepos.mocks.tsx - Mock response for the UserRepos query
- UserRepos.data.tsx - Data fetching component for the UserRepos component
- UserRepos.tsx - UserRepos React component
- UserRepos.module.css - CSS module for UserRepos component
```

## Deployment

The `build` command creates a working Next.js 13 app, so you can deploy it to any hosting provider that supports Next.js.

Deploying to [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com) is as easy as hooking up your repository to the service and let the service auto detect the next app and configure it for you.
