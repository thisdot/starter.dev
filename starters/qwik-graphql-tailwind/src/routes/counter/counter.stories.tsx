import { Meta } from '@storybook/html';
import { Counter } from './counter';

export default {
  title: 'Counter',
} as Meta;

const Template = () => <Counter />;

export const Demo = Template.bind({});
