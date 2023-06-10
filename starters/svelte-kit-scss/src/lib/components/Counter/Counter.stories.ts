import type { Meta, StoryObj } from '@storybook/svelte';

import Counter from './Counter.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/svelte/writing-stories/introduction
const meta = {
  title: 'Example/Counter',
  component: Counter,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/svelte/writing-stories/args
export const Primary: Story = {
  args: {},
};
