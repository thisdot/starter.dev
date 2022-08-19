import NumberCounter from './NumberCounter.vue';

export default {
  title: 'Components/NumberCounter',
  component: NumberCounter,
  argTypes: {},
};

const Template = (args) => ({
  components: { NumberCounter },
  setup() {
    return { args };
  },
  template: '<NumberCounter v-bind="args" />',
});

export const Default = Template.bind({});
