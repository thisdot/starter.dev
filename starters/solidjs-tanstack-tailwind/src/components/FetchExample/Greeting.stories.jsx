import { Greeting } from '.';

export default {
  title: 'Example/Fetch Example',
  component: Greeting,
  argTypes: {},
};

export const FetchExample = (args) => <Greeting {...args} />;
