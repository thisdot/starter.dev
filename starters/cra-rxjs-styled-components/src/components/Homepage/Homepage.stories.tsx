import { ComponentMeta } from '@storybook/react';
import { Homepage } from './Homepage';

export default {
  title: 'Example/Homepage',
  component: Homepage,
} as ComponentMeta<typeof Homepage>;

const Template = () => <Homepage />;

export const Header = Template.bind({});
