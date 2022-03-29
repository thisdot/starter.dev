import { ComponentMeta } from '@storybook/react';
import { Counter } from './Counter';

export default {
  title: 'Example/Counter',
  component: Counter,
} as ComponentMeta<typeof Counter>;

const Template = () => <Counter />;

export const IncrementButton = Template.bind({});
