import { Meta, StoryFn } from '@storybook/react';
import CardLineItem from '../CartLineItem';

const mockedLine = {
	id: 'dsahjsdh',
	quantity: 2,
	cost: {
		amountPerQuantity: {
			amount: '100',
			currencyCode: 'USD',
		},
		compareAtAmountPerQuantity: {
			amount: '200',
			currencyCode: 'USD',
		},
		totalAmount: {
			amount: '765.9',
			currencyCode: 'USD',
		},
	},
	merchandise: {
		title: 'My Merchandise',
		image:
			'https://cdn.shopify.com/s/files/1/0759/6589/0841/products/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1683819483&width=990',
		product: {
			handle: '',
			title: 'The Liquid Snowboard',
		},
		selectedOptions: [
			{
				name: 'Size',
				value: '154cm',
			},
			{
				name: 'Color',
				value: 'Syntax',
			},
		],
	},
};

export default {
	title: 'Components/CardLineItem',
	component: CardLineItem,
} as Meta;

const Template: StoryFn = () => (
	<div className=" w-96">
		<CardLineItem
			line={mockedLine}
			adjustItemQuantity={() => null}
			deleteItem={() => null}
		/>
	</div>
);

export const Default = Template.bind({});
