import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { NavigationLink } from './NavigationLink';

export default {
  title: 'Example/NavigationLink',
  component: NavigationLink,
} as ComponentMeta<typeof NavigationLink>;

const Template = () => <NavigationLink to="/" label="Return Home" />;

export const Default = Template.bind({});
