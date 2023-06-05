import '../src/index.css';
import { render } from 'solid-js/web';

export const decorators = [
  (Story) => {
    const solidRoot = document.createElement('div');

    render(Story, solidRoot);

    return solidRoot;
  },
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
