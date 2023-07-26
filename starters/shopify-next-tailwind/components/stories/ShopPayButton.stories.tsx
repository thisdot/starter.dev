import ShopPayButton from '../ShopPayButton';
import { StoryFn, Meta } from '@storybook/react';

export default {
	title: 'Components/ShopPayButton',
	component: ShopPayButton,
} as Meta;

const Template: StoryFn<{
	variantIds: string[];
	storeDomain: string;
	width: 'full' | 'auto';
}> = args => (
	<div
		style={{
			maxWidth: '600px',
		}}
	>
		<ShopPayButton {...args} />
	</div>
);

export const Default = Template.bind({});
Default.args = {
	variantIds: ['variant1', 'variant2'],
	storeDomain: 'example.myshopify.com',
	width: 'full',
};
