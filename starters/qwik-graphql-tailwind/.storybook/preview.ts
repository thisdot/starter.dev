// Based on https://github.com/BuilderIO/qwik/discussions/787#discussioncomment-3715103
import { JSXNode } from '@builder.io/qwik';
import { QWIK_LOADER } from '@builder.io/qwik/loader/index';
import { render } from '@builder.io/qwik';
import '../src/global.css';
eval(QWIK_LOADER);

export const decorators = [
  (Story: () => JSXNode) => {
    const parent = document.createElement('div');
    const jsxNode = Story();
    render(parent, jsxNode);
    return parent;
  },
];
