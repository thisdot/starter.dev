import { Meta, StoryFn } from '@storybook/react';
import { ProductCard } from '../ProductCard';

export default {
	title: 'Components/ProductCard',
	component: ProductCard,
	argTypes: {
		product: {
			control: {
				disable: true,
			},
		},
	},
} as Meta;

const mockedProduct = {
	id: 'id',
	handle: 'handle',
	availableForSale: true,
	title: 'title',
	description: 'description',
	descriptionHtml: 'descriptionHtml',
	options: [],
	priceRange: {
		maxVariantPrice: {
			amount: '200',
			currencyCode: 'USD',
		},
		minVariantPrice: {
			amount: '100',
			currencyCode: 'USD',
		},
	},
	featuredImage: {
		url: 'https://cdn.shopify.com/s/files/1/0759/6589/0841/products/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1683819483&width=990',
		altText: 'test',
		width: 100,
		height: 100,
	},
	seo: {
		title: 'seotitle',
		description: 'seodescription',
	},
	media: { nodes: [] },
	tags: [],
	updatedAt: '2022-01-01T00:00:00Z',
	vendor: 'vendore',
	productType: 'type',
	publishedAt: '2022-01-01T00:00:00Z',
	images: [
		{
			url: 'https://cdn.shopify.com/s/files/1/0759/6589/0841/products/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1683819483&width=990',
			altText: 'test',
			width: 100,
			height: 100,
		},
	],
	variants: {
		nodes: [
			{
				id: 'test',
				title: 'test',
				availableForSale: true,
				selectedOptions: [],
				price: {
					amount: '100',
					currencyCode: 'USD',
				},
				image: {
					url: 'https://cdn.shopify.com/s/files/1/0759/6589/0841/products/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1683819483&width=990',
					altText: 'test',
					width: 100,
					height: 100,
				},
				compareAtPrice: {
					amount: '200',
					currencyCode: 'USD',
				},
				sku: 'sku',
			},
		],
		edges: [
			{
				node: {
					id: 'test',
					title: 'test',
					availableForSale: true,
					selectedOptions: [],
					price: {
						amount: '100',
						currencyCode: 'USD',
					},
					image: {
						url: 'https://cdn.shopify.com/s/files/1/0759/6589/0841/products/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1683819483&width=990',
						altText: 'test',
						width: 100,
						height: 100,
					},
					compareAtPrice: {
						amount: '200',
						currencyCode: 'USD',
					},
					sku: 'sku',
				},
			},
		],
	},
};

const Template: StoryFn = args => (
	<div className="flex flex-col gap-2 max-w-sm">
		<ProductCard product={mockedProduct} {...args} />
	</div>
);

export const Default = Template.bind({});
Default.args = {
	label: 'Sale',
	quickAdd: true,
};
