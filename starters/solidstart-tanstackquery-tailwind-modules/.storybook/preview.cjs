/* @refresh reload */

import { render } from "solid-js/web";
import '../src/root.css';

import {
  initialize,
  mswDecorator
} from 'msw-storybook-addon';

// Initialize MSW
initialize();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

let disposeStory;

export const decorators = [
  (Story) => {
    if (disposeStory) {
      disposeStory();
    }

    const root = document.getElementById("root");
    const solidRoot = document.createElement("div");

    solidRoot.setAttribute("id", "solid-root");
    root.appendChild(solidRoot);

    disposeStory = render(Story, solidRoot);

    return solidRoot;
    // return createRoot(() => Story()); // do not work correctly https://github.com/solidjs/solid/issues/553
  },
  mswDecorator
];
