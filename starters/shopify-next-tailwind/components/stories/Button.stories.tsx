import { Meta, StoryFn } from '@storybook/react';
import { Button } from '../Button';

export default {
	title: 'Components/Button',
	component: Button,
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'inline'],
		},
		width: {
			control: 'select',
			options: ['auto', 'full'],
		},
	},
} as Meta;

const Template: StoryFn = args => <Button {...args}>Click me</Button>;

export const Primary = Template.bind({});
Primary.args = {
	variant: 'primary',
	width: 'auto',
};

export const Secondary = Template.bind({});
Secondary.args = {
	variant: 'secondary',
	width: 'auto',
};

export const Inline = Template.bind({});
Inline.args = {
	variant: 'inline',
	width: 'full',
};
