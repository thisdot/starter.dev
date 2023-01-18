import type { Meta, StoryObj } from '@storybook/svelte';

import Greeting from './Greeting.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/svelte/writing-stories/introduction
const meta = {
  title: 'Example/Greeting',
  component: Greeting,
  parameters: {
    layout: 'fullscreen',
  },

} satisfies Meta<Greeting>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/svelte/writing-stories/args
export const Primary: Story = {
  args: {
    message: 'from ThisDot Labs',
  },
};
