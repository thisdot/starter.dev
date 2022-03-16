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
  RedwoodIcon
} from './icons';

export interface NavItem {
  title: string;
  href: string;
  Icon?: ComponentType<any>;
  isExternal?: boolean;
}

export const REPO_URL = 'https://github.com/thisdot/starter.dev';

export const SHOWCASE_REPO_URL =
  'https://github.com/thisdot/starter.dev-showcases';

export const HEADER_NAV_ITEMS: NavItem[] = [
  {
    title: 'Frameworks',
    href: '/frameworks',
  },
  {
    title: 'Community',
    href: 'https://discord.com',
    Icon: (props) => (
      <DiscordIcon {...props} className="text-[#5766F2] dark:text-white" />
    ),
    isExternal: true,
  },
  {
    title: 'Contribute',
    href: '/contribute',
  },
  {
    title: 'Become a Sponsor',
    href: '/sponsor',
  },
];

export const FOOTER_NAV_ITEMS = HEADER_NAV_ITEMS.filter(
  (x) => x.title !== 'Frameworks'
);

export const TECHNOLOGIES = [
  {
    key: 'angular',
    name: 'Angular',
    tags: ['UI'],
    Icon: (props) => <AngularIcon {...props} />,
  },
  {
    key: 'react',
    name: 'React',
    tags: ['UI'],
    Icon: (props) => <ReactIcon {...props} />,
  },
  {
    key: 'svelte',
    name: 'Svelte',
    tags: ['UI'],
    Icon: (props) => <SvelteIcon {...props} />,
  },
  {
    key: 'vue',
    name: 'Vue',
    tags: ['UI'],
    Icon: (props) => <VueIcon {...props} />,
  },
  {
    key: 'next',
    name: 'NextJS',
    tags: ['Framework'],
    Icon: (props) => <NextIcon {...props} />,
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
    key: 'quasar',
    name: 'Quasar',
    tags: ['Framework'],
    Icon: (props) => <QuasarIcon {...props} />,
  },
  {
    key: 'blitz',
    name: 'Blitz',
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
    name: 'Redwood',
    tags: ['Framework'],
    Icon: (props) => <RedwoodIcon {...props} />,
  },
  {
    key: 'tailwind',
    name: 'Tailwind',
    tags: ['CSS'],
    Icon: (props) => <TailwindIcon {...props} />,
  },
  {
    key: 'material-ui',
    name: 'Material-UI',
    tags: ['CSS'],
    Icon: (props) => <MaterialUIIcon {...props} />,
  },
  {
    key: 'vanilla-extract',
    name: 'Vanilla Extract',
    tags: ['CSS'],
    Icon: (props) => <VanillaExtractIcon {...props} />,
  },
  {
    key: 'css module',
    name: 'CSS Module',
    tags: ['CSS'],
    Icon: (props) => <CSSModuleIcon {...props} />,
  },
  {
    key: 'styled-components',
    name: 'Styled Components',
    tags: ['CSS'],
    Icon: (props) => <SCIcon {...props} />,
  },
  {
    key: 'saas',
    name: 'SaaS',
    tags: ['CSS'],
    Icon: (props) => <SaaSIcon {...props} />,
  },
  {
    key: 'element-ui',
    name: 'Element-UI',
    tags: ['CSS'],
    Icon: (props) => <ElementUIIcon {...props} />,
  },
  {
    key: 'bootstrap',
    name: 'Bootstrap',
    tags: ['CSS'],
    Icon: (props) => <BootstrapIcon {...props} />
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
    key: 'react-query',
    name: 'React Query',
    tags: ['Data'],
    Icon: (props) => <ReactQueryIcon {...props} />,
  },
  {
    key: 'redux',
    name: 'Redux',
    tags: ['Data'],
    Icon: (props) => <ReduxIcon {...props} />,
  },
  {
    key: 'ngrx',
    name: 'NgRx',
    tags: ['Data'],
    Icon: (props) => <NgRxIcon {...props} />,
  },
  {
    key: 'rxjs',
    name: 'RxJs',
    tags: ['Data'],
    Icon: (props) => <RxJsIcon {...props} />,
  },
  {
    key: 'graphql',
    name: 'GraphQL',
    tags: ['Data'],
    Icon: (props) => <GraphQLIcon {...props} />,
  },
  {
    key: 'rest api',
    name: 'REST API',
    tags: ['Data'],
    Icon: (props) => <RestIcon {...props} />
  },
  {
    key: 'relay',
    name: 'Relay',
    tags: ['Data'],
    Icon: (props) => <RelayIcon {...props} />
  },
  {
    key: 'apollo',
    name: 'Apollo',
    tags: ['Data'],
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
];
