import { Section } from '../../Text';
import { StoryFn, Meta } from '@storybook/react';

export default {
	title: 'Typography Components/Section',
	component: Section,
	argTypes: {
		divider: {
			control: {
				type: 'select',
				options: ['none', 'top', 'bottom', 'both'],
			},
		},
		display: {
			control: {
				type: 'select',
				options: ['grid', 'flex'],
			},
		},
		padding: {
			control: {
				type: 'select',
				options: ['x', 'y', 'swimlane', 'all'],
			},
		},
		as: {
			control: 'select',
			disabled: true,
		},
	},
} as Meta;

const SectionComponent: StoryFn = (args: {
	divider?: 'none' | 'top' | 'bottom' | 'both';
	display?: 'grid' | 'flex';
	padding?: 'x' | 'y' | 'swimlane' | 'all';
}) => <Section {...args}>This is the Section component</Section>;

export const DefaultSection = SectionComponent.bind({});

DefaultSection.args = {};
