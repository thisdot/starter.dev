/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from 'react';
import {
  DiscordIcon,
  NextIcon,
  ReactIcon,
  ReactQueryIcon,
  TailwindIcon,
  VanillaExtractIcon,
  RemixIcon,
  ApolloIcon,
  ViteLogo,
  SvelteIcon,
  VueIcon,
  AngularIcon,
  ElementUIIcon,
  SaaSIcon,
  GraphQLIcon,
  RelayIcon,
  NuxtIcon,
  NgRxIcon,
  RxJsIcon,
  SCIcon,
  QuasarIcon,
  EleventyIcon,
  RestIcon,
  WebpackIcon,
  BlitzIcon,
  MaterialUIIcon,
  AstroIcon,
  BootstrapIcon,
  ReduxIcon,
  GatsbyIcon,
  CSSModuleIcon,
  RedwoodIcon,
  PiniaIcon,
  QwikIcon,
  SolidJsIcon,
  ChakraIcon,
  ServerlessIcon,
  DenoIcon,
  DenoDBIcon,
  ExpressIcon,
  PostgresIcon,
  TypeOrmIcon,
  SolidStartIcon,
  TanstackIcon,
  ExpoIcon,
  ZustandIcon,
  PrismaIcon,
  ContentfulIcon,
  VuetifyIcon,
  Nuxt3Icon,
  XstateIcon,
  CssIcon,
  StorybookIcon,
  TypescriptIcon,
  MockServiceWorkerIcon,
  RedisIcon,
  JestIcon,
  ReactNavigationIcon,
  SwaggerIcon,
  BullmqIcon,
  EmotionIcon,
  AxiosIcon,
  VitestIcon,
  AWSSQSIcon,
  PlaywrightIcon,
  GitHubIcon,
  BriefcaseIcon,
} from './icons';

export interface NavItem {
  title: string;
  href: string;
  Icon?: ComponentType<any>;
  isExternal?: boolean;
}

export const REPO_URL = 'https://github.com/thisdot/starter.dev';

export const SHOWCASE_REPO_URL =
  'https://github.com/thisdot/starter.dev-github-showcases';

export const HEADER_NAV_ITEMS: NavItem[] = [
  {
    title: 'Explore Kits by Tech',
    href: '/kits-by-tool',
  },
  {
    title: 'Community',
    href: 'https://discord.gg/u7gqGcpR56',
    Icon: (props) => (
      <DiscordIcon {...props} className="text-[#5766F2] dark:text-white" />
    ),
    isExternal: true,
  },
  {
    title: 'Contribute',
    href: `${REPO_URL}/blob/main/CONTRIBUTING.md`, //This page is not available yet on the repo
    isExternal: true,
  },
];

export const FOOTER_NAV_ITEMS = HEADER_NAV_ITEMS.filter(
  (x) => x.title !== 'Explore Kits by Tech'
);

export const TECHNOLOGIES = [
  {
    key: 'express',
    name: 'Express.js',
    tags: ['Framework'],
    Icon: (props) => <ExpressIcon {...props} />,
  },
  {
    key: 'angular',
    name: 'Angular',
    tags: ['Core UI'],
    Icon: (props) => <AngularIcon {...props} />,
  },
  {
    key: 'react',
    name: 'React',
    tags: ['Core UI'],
    Icon: (props) => <ReactIcon {...props} />,
  },
  {
    key: 'svelte-kit',
    name: 'SvelteKit',
    tags: ['Framework'],
    Icon: (props) => <SvelteIcon {...props} />,
  },
  {
    key: 'vue',
    name: 'Vue',
    tags: ['Core UI'],
    Icon: (props) => <VueIcon {...props} />,
  },
  {
    key: 'solidjs',
    name: 'SolidJS',
    tags: ['Core UI'],
    Icon: (props) => <SolidJsIcon {...props} />,
  },
  {
    key: 'next',
    name: 'NextJS',
    tags: ['Framework'],
    Icon: (props) => <NextIcon {...props} />,
  },
  {
    key: 'nuxt 2',
    name: 'NuxtJS 2',
    tags: ['Framework'],
    Icon: (props) => <NuxtIcon {...props} />,
  },
  {
    key: 'nuxt 3',
    name: 'NuxtJS 3',
    tags: ['Framework'],
    Icon: (props) => <Nuxt3Icon {...props} />,
  },
  {
    key: 'nuxt',
    name: 'NuxtJS',
    tags: ['Framework'],
    Icon: (props) => <NuxtIcon {...props} />,
  },
  {
    key: 'remix',
    name: 'Remix',
    tags: ['Framework'],
    Icon: (props) => <RemixIcon {...props} />,
  },
  {
    key: 'solidstart',
    name: 'Solid Start',
    tags: ['Framework'],
    Icon: (props) => <SolidStartIcon {...props} />,
  },
  {
    key: 'quasar',
    name: 'Quasar',
    tags: ['Framework'],
    Icon: (props) => <QuasarIcon {...props} />,
  },
  {
    key: 'blitz',
    name: 'Blitz.js',
    tags: ['Framework'],
    Icon: (props) => <BlitzIcon {...props} />,
  },
  {
    key: 'gatsby',
    name: 'Gatsby',
    tags: ['Framework'],
    Icon: (props) => <GatsbyIcon {...props} />,
  },
  {
    key: 'redwood',
    name: 'RedwoodJS',
    tags: ['Framework'],
    Icon: (props) => <RedwoodIcon {...props} />,
  },
  {
    key: 'qwik',
    name: 'Qwik',
    tags: ['Framework'],
    Icon: (props) => <QwikIcon {...props} />,
  },
  {
    key: 'tailwind',
    name: 'Tailwind',
    tags: ['Styling'],
    Icon: (props) => <TailwindIcon {...props} />,
  },
  {
    key: 'material-ui',
    name: 'Material-UI',
    tags: ['Styling'],
    Icon: (props) => <MaterialUIIcon {...props} />,
  },
  {
    key: 'vanilla-extract',
    name: 'Vanilla Extract',
    tags: ['Styling'],
    Icon: (props) => <VanillaExtractIcon {...props} />,
  },
  {
    key: 'css module',
    name: 'CSS Module',
    tags: ['Styling'],
    Icon: (props) => <CSSModuleIcon {...props} />,
  },
  {
    key: 'styled-components',
    name: 'Styled Components',
    tags: ['Styling'],
    Icon: (props) => <SCIcon {...props} />,
  },
  {
    key: 'sass',
    name: 'SASS',
    tags: ['Styling'],
    Icon: (props) => <SaaSIcon {...props} />,
  },
  {
    key: 'element-ui',
    name: 'Element-UI',
    tags: ['Styling'],
    Icon: (props) => <ElementUIIcon {...props} />,
  },
  {
    key: 'bootstrap',
    name: 'Bootstrap',
    tags: ['Styling'],
    Icon: (props) => <BootstrapIcon {...props} />,
  },
  {
    key: 'chakra-ui',
    name: 'Chakra UI',
    tags: ['Styling'],
    Icon: (props) => <ChakraIcon {...props} />,
  },
  {
    key: 'astro',
    name: 'Astro',
    tags: ['Static Site Builder'],
    Icon: (props) => <AstroIcon {...props} />,
  },
  {
    key: '11ty',
    name: '11ty',
    tags: ['Static Site Builder'],
    Icon: (props) => <EleventyIcon {...props} />,
  },
  {
    key: 'contentful',
    name: 'Contentful',
    tags: ['Data Management'],
    Icon: ContentfulIcon,
  },
  {
    key: 'react-query',
    name: 'React Query',
    tags: ['Data Management'],
    Icon: (props) => <ReactQueryIcon {...props} />,
  },
  {
    key: 'redux',
    name: 'Redux',
    tags: ['Data Management'],
    Icon: (props) => <ReduxIcon {...props} />,
  },
  {
    key: 'tanstack-query',
    name: 'Tanstack Query',
    tags: ['Data Management'],
    Icon: (props) => <TanstackIcon {...props} />,
  },
  {
    key: 'ngrx',
    name: 'NgRx',
    tags: ['Data Management'],
    Icon: (props) => <NgRxIcon {...props} />,
  },
  {
    key: 'rxjs',
    name: 'RxJS',
    tags: ['Data Management'],
    Icon: (props) => <RxJsIcon {...props} />,
  },
  {
    key: 'serverless',
    name: 'Serverless',
    tags: ['Infrastructure'],
    Icon: (props) => <ServerlessIcon {...props} />,
  },
  {
    key: 'apollo-server',
    name: 'Apollo Server',
    tags: ['Middleware'],
    Icon: (props) => <ApolloIcon {...props} />,
  },
  {
    key: 'graphql',
    name: 'GraphQL',
    tags: ['API Specification'],
    Icon: (props) => <GraphQLIcon {...props} />,
  },
  {
    key: 'rest api',
    name: 'REST API',
    tags: ['Data Management'],
    Icon: (props) => <RestIcon {...props} />,
  },
  {
    key: 'relay',
    name: 'Relay',
    tags: ['Data Management'],
    Icon: (props) => <RelayIcon {...props} />,
  },
  {
    key: 'apollo',
    name: 'Apollo Client',
    tags: ['Data Management'],
    Icon: (props) => <ApolloIcon {...props} />,
  },
  {
    key: 'vite',
    name: 'Vite',
    tags: ['Tooling'],
    Icon: (props) => <ViteLogo {...props} />,
  },
  {
    key: 'webpack',
    name: 'Webpack',
    tags: ['Tooling'],
    Icon: (props) => <WebpackIcon {...props} />,
  },
  {
    key: 'pinia',
    name: 'Pinia',
    tags: ['Data Management'],
    Icon: (props) => <PiniaIcon {...props} />,
  },
  {
    key: 'deno',
    name: 'Deno',
    tags: ['Framework'],
    Icon: (props) => <DenoIcon {...props} />,
  },
  {
    key: 'denodb',
    name: 'DenoDB',
    tags: ['Data Management'],
    Icon: (props) => <DenoDBIcon {...props} />,
  },
  {
    key: 'typeorm',
    name: 'TypeORM',
    tags: ['Data Management'],
    Icon: (props) => <TypeOrmIcon {...props} />,
  },
  {
    key: 'postgres',
    name: 'Postgres',
    tags: ['Data Management'],
    Icon: (props) => <PostgresIcon {...props} />,
  },
  {
    key: 'expo',
    name: 'Expo',
    tags: ['Tooling'],
    Icon: (props) => <ExpoIcon {...props} />,
  },
  {
    key: 'zustand',
    name: 'Zustand',
    tags: ['Data Management'],
    Icon: (props) => <ZustandIcon {...props} />,
  },
  {
    key: 'prisma',
    name: 'Prisma',
    tags: ['Data Management'],
    Icon: (props) => <PrismaIcon {...props} />,
  },
  {
    key: 'vuetify',
    name: 'Vuetify',
    tags: ['Styling'],
    Icon: (props) => <VuetifyIcon {...props} />,
  },
  {
    key: 'xstate',
    name: 'XState',
    tags: ['Data Management'],
    Icon: (props) => <XstateIcon {...props} />,
  },
  {
    key: 'css',
    name: 'CSS',
    tags: ['Styling'],
    Icon: (props) => <CssIcon {...props} />,
  },
  {
    key: 'storybook',
    name: 'Storybook',
    tags: ['Tooling'],
    Icon: (props) => <StorybookIcon {...props} />,
  },
  {
    key: 'typescript',
    name: 'Typescript',
    tags: ['Tooling'],
    Icon: (props) => <TypescriptIcon {...props} />,
  },
  {
    key: 'create-react-app',
    name: 'Create React App',
    tags: ['Core UI'],
    Icon: (props) => <ReactIcon {...props} />,
  },
  {
    key: 'mock-service-worker',
    name: 'Mock Service Worker',
    tags: ['Tooling'],
    Icon: (props) => <MockServiceWorkerIcon {...props} />,
  },
  {
    key: 'redis',
    name: 'Redis',
    tags: ['Data Management'],
    Icon: (props) => <RedisIcon {...props} />,
  },
  {
    key: 'jest',
    name: 'Jest',
    tags: ['Framework'],
    Icon: (props) => <JestIcon {...props} />,
  },
  {
    key: 'react-navigation',
    name: 'React Navigation',
    tags: ['Library'],
    Icon: (props) => <ReactNavigationIcon {...props} />,
  },
  {
    key: 'swagger',
    name: 'Swagger',
    tags: ['Tooling'],
    Icon: (props) => <SwaggerIcon {...props} />,
  },
  {
    key: 'bullmq',
    name: 'BullMQ',
    tags: ['Data Management'],
    Icon: (props) => <BullmqIcon {...props} />,
  },
  {
    key: 'emotion',
    name: 'Emotion',
    tags: ['Styling'],
    Icon: (props) => <EmotionIcon {...props} />,
  },
  {
    key: 'axios',
    name: 'Axios',
    tags: ['Library'],
    Icon: (props) => <AxiosIcon {...props} />,
  },
  {
    key: 'qwik-city',
    name: 'Qwik City',
    tags: ['Middleware'],
    Icon: (props) => <QwikIcon {...props} />,
  },
  {
    key: 'vitest',
    name: 'Vitest',
    tags: ['Tooling'],
    Icon: (props) => <VitestIcon {...props} />,
  },
  {
    key: 'aws-sqs',
    name: 'AWS SQS',
    tags: ['Middleware'],
    Icon: (props) => <AWSSQSIcon {...props} />,
  },
  {
    key: 'svelte',
    name: 'Svelte',
    tags: ['Framework'],
    Icon: (props) => <SvelteIcon {...props} />,
  },
  {
    key: 'playwright',
    name: 'Playwright',
    tags: ['Tooling'],
    Icon: (props) => <PlaywrightIcon {...props} />,
  },
  {
    key: 'vue-router',
    name: 'Vue Router',
    tags: ['Library'],
    Icon: (props) => <VueIcon {...props} />,
  },
];

export const SHOWCASES = [
  {
    kit: 'angular-apollo-tailwind',
    name: 'GitHub Showcase',
    repo: 'https://github.com/thisdot/starter.dev-github-showcases/tree/main/angular-apollo-tailwind',
    app: 'https://angular-apollo-tailwind.starter.dev/',
    Icon: (props) => <GitHubIcon {...props} />,
  },
  // The angular-ngrx-scss showcase is currently not finished
  // so this is set as false in that starters package.json
  {
    kit: 'angular-ngrx-scss',
    name: 'GitHub Showcase',
    repo: 'https://github.com/thisdot/starter.dev-github-showcases/tree/main/angular-ngrx-scss',
    app: 'https://angular-ngrx-scss.starter.dev',
    Icon: (props) => <GitHubIcon {...props} />,
  },
  {
    kit: 'cra-rxjs-styled-components',
    name: 'GitHub Showcase',
    repo: 'https://github.com/thisdot/starter.dev-github-showcases/tree/main/cra-rxjs-styled-components',
    app: 'https://cra-rxjs-styled-components.starter.dev',
    Icon: (props) => <GitHubIcon {...props} />,
  },
  {
    kit: 'expo-zustand-styled-components',
    name: 'GitHub Showcase',
    repo: 'https://github.com/thisdot/starter.dev-github-showcases/tree/main/expo-zustand-styled-components',
    app: '',
    Icon: (props) => <GitHubIcon {...props} />,
  },
  {
    kit: 'next-react-query-tailwind',
    name: 'GitHub Showcase',
    repo: 'https://github.com/thisdot/starter.dev-github-showcases/tree/main/next-react-query-tailwind',
    app: 'https://next-react-query-tailwind.starter.dev',
    Icon: (props) => <GitHubIcon {...props} />,
  },
  // The nuxt2-pinia-tailwind showcase is currently not finished
  // so this is set as false in that starters package.json
  {
    kit: 'nuxt2-pinia-tailwind',
    name: 'GitHub Showcase',
    repo: 'https://github.com/thisdot/starter.dev-github-showcases/tree/main/nuxt-pinia-tailwind',
    app: 'https://nuxt-pinia-tailwind.starter.dev',
    Icon: (props) => <GitHubIcon {...props} />,
  },
  {
    kit: 'qwik-graphql-tailwind',
    name: 'GitHub Showcase',
    repo: 'https://github.com/thisdot/starter.dev-github-showcases/tree/main/qwik-graphql-tailwind',
    app: 'https://qwik-graphql-tailwind.starter.dev',
    Icon: (props) => <GitHubIcon {...props} />,
  },
  // The remix-gql-tailwind showcase is currently broken
  // so this is set as false in that starters package.json
  {
    kit: 'remix-gql-tailwind',
    name: 'GitHub Showcase',
    repo: 'https://github.com/thisdot/starter.dev-github-showcases/tree/main/remix-gql-tailwind',
    app: '',
    Icon: (props) => <GitHubIcon {...props} />,
  },
  {
    kit: 'solidjs-tailwind',
    name: 'GitHub Showcase',
    repo: 'https://github.com/thisdot/starter.dev-github-showcases/tree/main/solidjs-tailwind',
    app: 'https://solidjs-tailwind.starter.dev',
    Icon: (props) => <GitHubIcon {...props} />,
  },
  {
    kit: 'solidstart-tanstackquery-tailwind-modules',
    name: 'GitHub Showcase',
    repo: 'https://github.com/thisdot/starter.dev-github-showcases/tree/main/solidstart-tanstackquery-tailwind-modules',
    app: 'https://solidstart-tanstackquery-tailwind-modules.starter.dev',
    Icon: (props) => <GitHubIcon {...props} />,
  },
  {
    kit: 'svelte-kit-scss',
    name: 'GitHub Showcase',
    repo: 'https://github.com/thisdot/starter.dev-github-showcases/tree/main/svelte-kit-scss',
    app: 'https://svelte-kit-scss.starter.dev',
    Icon: (props) => <GitHubIcon {...props} />,
  },
  {
    kit: 'vue3-apollo-quasar',
    name: 'GitHub Showcase',
    repo: 'https://github.com/thisdot/starter.dev-github-showcases/tree/main/vue3-apollo-quasar',
    app: 'https://vue3-apollo-quasar.starter.dev',
    Icon: (props) => <GitHubIcon {...props} />,
  },
];

export const SPONSORS_ICON = [
  {
    name: 'angular',
    Icon: (props) => <AngularIcon {...props} />,
  },
];
