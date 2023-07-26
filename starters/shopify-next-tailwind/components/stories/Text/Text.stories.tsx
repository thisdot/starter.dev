import { Text } from '../../Text';
import { StoryFn, Meta } from '@storybook/react';

export default {
	title: 'Typography Components/Text',
	component: Text,
	argTypes: {
		color: {
			control: {
				type: 'select',
				options: ['default', 'primary', 'subtle', 'notice', 'contrast'],
			},
		},
		size: {
			control: {
				type: 'select',
				options: ['lead', 'copy', 'fine'],
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

const TextComponent: StoryFn = (args: {
	color?: 'default' | 'primary' | 'subtle' | 'notice' | 'contrast';
	size?: 'lead' | 'copy' | 'fine';
	width?: 'default' | 'narrow' | 'wide';
}) => <Text {...args}>This is the text component</Text>;

export const DefaultText = TextComponent.bind({});

DefaultText.args = {};
