import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { NavigationLink } from './NavigationLink';

const args = {
  to: '/',
  label: 'Home',
}

const meta: Meta = {
  title: 'Example/NavigationLink',
  component: NavigationLink,
  parameters: {
    layout: 'centered',
  },
  args,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => <NavigationLink {...args} />,
};
