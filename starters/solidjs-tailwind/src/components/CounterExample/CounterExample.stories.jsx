import { CounterExample } from '.';

export default {
  title: 'Example/ Counter Example',
  component: CounterExample,
  argTypes: {},
};

const Template = (args) => <CounterExample {...args} />;

export const Counter = Template.bind({});