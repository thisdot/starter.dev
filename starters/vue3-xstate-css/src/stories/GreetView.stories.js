import GreetView from '../views/GreetView.vue';

export default {
  title: 'Pages/Greet',
  component: GreetView,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = (args) => ({
  components: { GreetView },
  setup: () => ({ args }),
  template: '<GreetView />',
});
