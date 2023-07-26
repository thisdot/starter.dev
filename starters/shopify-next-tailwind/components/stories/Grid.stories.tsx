import { Meta, StoryFn } from '@storybook/react';
import { Grid } from '../Grid';

export default {
	title: 'Components/Grid',
	component: Grid,
	argTypes: {
		flow: {
			control: 'select',
			options: ['row', 'col'],
		},
		gap: {
			control: 'select',
			options: ['default', 'blog'],
		},
		layout: {
			control: 'select',
			options: ['default', 'products', 'auto', 'blog'],
		},
		as: {
			control: 'select',
			disabled: true,
		},
	},
} as Meta;

const Template: StoryFn = args => {
	return (
		<Grid {...args}>
			{Array.from(Array(args.items).keys()).map(el => (
				<div key={el} className="border border-red-500">{`Item ${el}`}</div>
			))}
		</Grid>
	);
};

export const GridComponent = Template.bind({});
GridComponent.args = {};
