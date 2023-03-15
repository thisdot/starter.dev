# next13-zustand-bulma Starter Kit

This starter kit features [**Next.js 13+**](https://beta.nextjs.org/docs) (with the `appDir` and server components), [**Zustand**](https://zustand-demo.pmnd.rs/) for client-side state management, and [**Bulma**](https://bulma.io/) for styling.

##### How to use this Starter Kit:

```bash
npm create @this-dot/starter -- --kit next13-zustand-bulma
```

<sub>(use any of `npm` / `yarn` / `pnpm`)</sub>

_[(...or use one of our alternative setup instructions)](./SETUP.md)_

<details>
<summary>&nbsp;&nbsp;<b>Table of Contents</b></summary>

- [next13-zustand-bulma starter kit](#next13-zustand-bulma-starter-kit)
  - [Tech Stack](#tech-stack)
    - [Included Tooling](#included-tooling)
  - [Getting Started](#getting-started)
  - [Available Commands](#available-commands)
  - [Project Details](#project-details)
    - [Kit Organization / Architecture](#kit-organization--architecture)
    - [Styling and Theme](#styling-and-theme)
    - [Font Loading](#font-loading)
    - [Colocation in directories](#colocation-in-directories)
  - [Demo Implementation](#demo-implementation)
  - [Deployment](#deployment)

</details>

## Tech Stack

- [Next.js v13.x](https://nextjs.org)
- [React v18.x](https://reactjs.org)
- [Zustand v4.x](https://zustand-demo.pmnd.rs/)
- [Bulma](https://bulma.io/)

#### Included Tooling

- [Jest](https://jestjs.io/) - Test runner
- [TypeScript v4](https://www.typescriptlang.org/) - Type checking
- [Storybook v7](https://storybook.js.org/) - Component sandbox and docs
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## Getting Started

- start by [creating a new Starter Kit](./SETUP.md) project
- `cd` into your project directory and run `npm install`.
- Run `npm run dev` to start the development server.
- Open your browser to `http://localhost:3000` to see the included example code running.

## Available Commands

- `npm run dev` - Starts the development server.
- `npm run test` - Runs the unit tests.
- `npm run storybook` - Starts the Storybook UI.
- `npm run lint` - Runs ESLint on the project.
- `npm run format` - Formats code for the entire project

## Project Details

### Kit Organization / Architecture

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
- UserRepos.query.tsx - GraphQL query for the UserRepos component
- UserRepos.data.tsx - Data fetching component for the UserRepos component
- UserRepos.view.tsx - View component for the UserRepos component
- UserRepos.module.css - CSS module for UserRepos component
```

## Demo Implementation

[Live Demo](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

[Repository](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

The demo for this starter kit is a partial implementation of some GitHub functionality. It uses the `!!TBD!!` library to authenticate users with their GitHub accounts and uses the GitHub `!!GraphQL/REST!! API` to fetch data from the GitHub API.

Check out the link above to learn more or check out the demo!

## Deployment

The `build` command creates a working Next.js 13 app, so you can deploy it to any hosting provider that supports Next.js.

Deploying to [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com) is as easy as hooking up your repository to the service and let the service auto detect the next app and configure it for you.
