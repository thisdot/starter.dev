import { Meta } from '@storybook/html';
import { DataFetching } from './data-fetching';

export default {
  title: 'Data Fetching',
} as Meta;

const Template = () => <DataFetching />;

export const Demo = Template.bind({});
