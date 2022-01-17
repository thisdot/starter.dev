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

export const headerNavItems: NavItem[] = [
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

export const footerNavItems = headerNavItems.filter(
  (x) => x.title !== 'Frameworks'
);

export const technologies = [
  {
    key: 'angular',
    name: 'Angular',
    tags: ['UI'],
  },
  {
    key: 'react',
    name: 'React',
    tags: ['UI'],
    Icon: ReactIcon,
  },
  {
    key: 'next',
    name: 'NextJS',
    tags: ['Framework'],
    Icon: NextIcon,
  },
  {
    key: 'remix',
    name: 'Remix',
    tags: ['Framework'],
    Icon: RemixIcon,
  },
  {
    key: 'tailwind',
    name: 'Tailwind',
    tags: ['CSS'],
    Icon: TailwindIcon,
  },
  {
    key: 'vanilla-extract',
    name: 'Vanilla Extract',
    tags: ['CSS'],
    Icon: VanillaExtractIcon,
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
    Icon: ReactQueryIcon,
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
    Icon: ApolloIcon,
  },
  {
    key: 'vite',
    name: 'Vite',
    tags: ['Tooling'],
    Icon: ViteLogo,
  },
];
