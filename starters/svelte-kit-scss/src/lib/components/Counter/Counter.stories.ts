import Counter from './Counter.svelte';

export default {
  title: 'Example/Counter',
  component: Counter,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = () => ({
  Component: Counter,
});

// More on args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary = Template.bind({});
