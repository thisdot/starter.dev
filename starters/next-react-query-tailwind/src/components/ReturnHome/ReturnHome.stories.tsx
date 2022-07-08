import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { ReturnHome } from './ReturnHome';

export default {
  title: 'Example/ReturnHome',
  component: ReturnHome,
} as ComponentMeta<typeof ReturnHome>;

const Template = () => <ReturnHome />;

export const Default = Template.bind({});
