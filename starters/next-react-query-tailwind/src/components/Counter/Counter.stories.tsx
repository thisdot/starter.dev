import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Counter } from './Counter';

const meta: Meta = {
  title: 'Example/Counter',
  component: Counter,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => <Counter />,
};
