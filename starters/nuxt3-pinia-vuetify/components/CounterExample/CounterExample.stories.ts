import CounterExample from './CounterExample.vue';

export default {
  title: "CounterExample",
  component: CounterExample
};

const Template = () => ({
  components: { CounterExample },
  template: `<CounterExample />`,
});

export const Story = Template.bind({});