import { ComponentMeta } from '@storybook/react';
import { RxJSExample } from './RxJS-Example';

export default {
  title: 'Example/Counter',
  component: RxJSExample,
} as ComponentMeta<typeof RxJSExample>;

const Template = () => <RxJSExample />;
