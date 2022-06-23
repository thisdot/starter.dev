import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { initialize, mswDecorator } from 'msw-storybook-addon';

initialize();

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  ),
  mswDecorator
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
