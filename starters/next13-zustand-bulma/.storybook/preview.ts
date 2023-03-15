import type { Preview } from '@storybook/react';
import { withFontDecorator } from './with-font-decorator';
import '@/app/globals.scss';

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
  },
};

export const decorators = [withFontDecorator];

export default preview;
