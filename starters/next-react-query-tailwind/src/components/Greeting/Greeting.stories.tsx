import type { Meta, StoryObj } from '@storybook/react';
import { createQueryProvider } from '../../utils/mockQueryClient';
import { helloMock } from '../../msw/handlers/helloMock';
import { Greeting } from './Greeting.data';

const meta: Meta = {
  title: 'Example/Greeting',
  component: Greeting,
  parameters: {
    msw: [helloMock],
    layout: 'centered',
  },
  args: {},
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const QueryProvider = createQueryProvider();
    return (
      <QueryProvider>
        <Greeting />
      </QueryProvider>
    );
  },
};
