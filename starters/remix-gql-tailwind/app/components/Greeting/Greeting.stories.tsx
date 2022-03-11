import type { ComponentMeta, Story } from '@storybook/react';
import { Greeting } from './Greeting';

export default {
  title: 'Example/Greeting',
  component: Greeting,
} as ComponentMeta<typeof Greeting>;

const Template: Story = (args) => {
  return (
      <Greeting message={args.hello} />
  );
};

export const Default = Template.bind({});
Default.args = {
  hello: "Hello world"
}
