import { Heading } from '../../Text';
import { StoryFn, Meta } from '@storybook/react';

export default {
	title: 'Typography Components/Heading',
	component: Heading,
	argTypes: {
		size: {
			control: {
				type: 'select',
				options: ['display', 'heading', 'lead', 'copy'],
			},
		},
		width: {
			control: {
				type: 'select',
				options: ['default', 'narrow', 'wide'],
			},
		},
		as: {
			control: 'select',
			disabled: true,
		},
	},
} as Meta;

const HeadingComponent: StoryFn = (args: {
	size?: 'display' | 'heading' | 'lead' | 'copy';
	width?: 'default' | 'narrow' | 'wide';
}) => <Heading {...args}>This is the Heading component</Heading>;

export const DefaultHeading = HeadingComponent.bind({});

DefaultHeading.args = {};
