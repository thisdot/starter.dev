import { PageHeader } from '../../Text';
import { StoryFn, Meta } from '@storybook/react';

export default {
	title: 'Typography Components/PageHeader',
	component: PageHeader,
	argTypes: {
		variant: {
			control: {
				type: 'select',
				options: ['default', 'blogPost', 'allCollections'],
			},
		},
	},
} as Meta;

const PageHeaderComponent: StoryFn = (args: {
	variant?: 'default' | 'blogPost' | 'allCollections';
}) => <PageHeader {...args}>This is the PageHeader component</PageHeader>;

export const DefaultPageHeader = PageHeaderComponent.bind({});

DefaultPageHeader.args = {};
