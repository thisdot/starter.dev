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
  },
  {
    key: 'react',
    name: 'React',
    tags: ['UI'],
    Icon: (props) => <ReactIcon {...props} />,
  },
  {
    key: 'next',
    name: 'NextJS',
    tags: ['Framework'],
    Icon: (props) => <NextIcon {...props} />,
  },
  {
    key: 'remix',
    name: 'Remix',
    tags: ['Framework'],
    Icon: (props) => <RemixIcon {...props} />,
  },
  {
    key: 'tailwind',
    name: 'Tailwind',
    tags: ['CSS'],
    Icon: (props) => <TailwindIcon {...props} />,
  },
  {
    key: 'vanilla-extract',
    name: 'Vanilla Extract',
    tags: ['CSS'],
    Icon: (props) => <VanillaExtractIcon {...props} />,
  },
  {
    key: 'emotion',
    name: 'Emotion',
    tags: ['CSS'],
  },
  {
    key: 'sass',
    name: 'Sass',
    tags: ['CSS'],
  },
  {
    key: 'react-query',
    name: 'React Query',
    tags: ['Data'],
    Icon: (props) => <ReactQueryIcon {...props} />,
  },
  {
    key: 'relay',
    name: 'Relay',
    tags: ['Data'],
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
];
