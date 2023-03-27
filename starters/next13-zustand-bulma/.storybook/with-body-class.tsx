import { makeDecorator } from '@storybook/preview-api';
import clsx from 'clsx';

export const withBodyClass = makeDecorator({
  name: 'withBodyClass',
  parameterName: 'bodyClass',
  wrapper: (storyFn, context, { parameters }) => {
    document.body.classList.add(clsx(parameters));
    return storyFn(context);
  },
});
