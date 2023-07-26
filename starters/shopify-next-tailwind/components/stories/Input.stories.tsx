import { Meta, StoryFn } from '@storybook/react';
import { Input } from '../Input';

export default {
	title: 'Components/Input',
	component: Input,
	argTypes: {
		variant: {
			control: {
				type: 'select',
				options: ['search', 'minisearch'],
			},
		},
	},
} as Meta;

const Template: StoryFn = args => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
	variant: 'default',
	placeholder: 'Default',
	type: 'text',
};

export const ErrorState = Template.bind({});
ErrorState.args = {
	variant: 'default',
	placeholder: 'Error',
	type: 'text',
	error: 'Error message',
};

export const Search = Template.bind({});
Search.args = {
	variant: 'search',
	placeholder: 'Search',
	type: 'search',
};

export const Minisearch = Template.bind({});
Minisearch.args = {
	variant: 'minisearch',
	placeholder: 'Search',
	type: 'search',
};
