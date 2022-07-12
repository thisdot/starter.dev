import { ComponentMeta } from '@storybook/react';
import { Loader } from './Loader';

export default {
  title: 'Example/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

const Template = () => <Loader />;

export const LoaderStories = Template.bind({});
