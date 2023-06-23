import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { createQueryProvider } from '../../utils/mockQueryClient';
import { helloMock } from '../../msw/handlers/helloMock';
import { Greeting } from './Greeting.data';

export default {
  title: 'Example/Greeting',
  component: Greeting,
  parameters: {
    msw: [helloMock],
  },
} as ComponentMeta<typeof Greeting>;

const Template: Story = () => {
  const QueryProvider = createQueryProvider();
  return (
    <QueryProvider>
      <Greeting />
    </QueryProvider>
  );
};

export const Default = Template.bind({});
