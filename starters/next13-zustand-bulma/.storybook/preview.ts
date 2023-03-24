import type { Preview } from '@storybook/react';
import { Open_Sans } from 'next/font/google';
import { withBodyClass } from './with-body-class';
import '@/app/globals.scss';

const opensans = Open_Sans({ subsets: ['latin'], weight: 'variable' });

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    bodyClass: opensans.className,
  },
};

export const decorators = [withBodyClass];

export default preview;
