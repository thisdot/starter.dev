import { Meta, StoryFn } from '@storybook/react';

import ProductListBox from '../ProductListBox';

export default {
	title: 'Components/Product List Box',
	component: ProductListBox,
} as Meta;

const Template: StoryFn = () => (
	<ProductListBox
		name="Material"
		values={[
			'Carbon-fiber',
			'Polycarbonate',
			'Fiberglass',
			'Kevlar®',
			'Polyethylene',
			'Vectran®',
			'Ultra-high-molecular-weight polyethylene',
			'Wood-composite',
		]}
	/>
);

export const Default = Template.bind({});
