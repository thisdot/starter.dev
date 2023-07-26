import { Meta, StoryFn } from '@storybook/react';
import { SortFilter } from '../SortFilter';
import { Collection, Filter } from '@/lib/shopify/types';

export default {
	title: 'Components/SortFilter',
	component: SortFilter,
} as Meta;

const mockedFilters = [
	{
		id: 'filter.v.availability',
		label: 'Availability',
		type: 'LIST',
		values: [
			{
				id: 'filter.v.availability.1',
				label: 'In stock',
				count: 27,
				input: '{"available":true}',
			},
			{
				id: 'filter.v.availability.0',
				label: 'Out of stock',
				count: 3,
				input: '{"available":false}',
			},
		],
	},
	{
		id: 'filter.v.price',
		label: 'Price',
		type: 'PRICE_RANGE',
		values: [
			{
				id: 'filter.v.price',
				label: 'Price',
				count: 0,
				input: '{"price":{"min":0,"max":2629.95}}',
			},
		],
	},
	{
		id: 'filter.p.product_type',
		label: 'Product type',
		type: 'LIST',
		values: [
			{
				id: 'filter.p.product_type.snowboards',
				label: 'Snowboards',
				count: 28,
				input: '{"productType":"Snowboards"}',
			},
		],
	},
	{
		id: 'filter.p.vendor',
		label: 'Brand',
		type: 'LIST',
		values: [
			{
				id: 'filter.p.vendor.snowdevil',
				label: 'Snowdevil',
				count: 28,
				input: '{"productVendor":"Snowdevil"}',
			},
		],
	},
	{
		id: 'filter.v.option.binding mount',
		label: 'Binding mount',
		type: 'LIST',
		values: [
			{
				id: 'filter.v.option.binding mount.nested',
				label: 'Nested',
				count: 1,
				input: '{"variantOption":{"name":"binding mount","value":"Nested"}}',
			},
			{
				id: 'filter.v.option.binding mount.optimistic',
				label: 'Optimistic',
				count: 1,
				input:
					'{"variantOption":{"name":"binding mount","value":"Optimistic"}}',
			},
		],
	},
	{
		id: 'filter.v.option.color',
		label: 'Color',
		type: 'LIST',
		values: [
			{
				id: 'filter.v.option.color.fed-green',
				label: 'FED Green',
				count: 17,
				input: '{"variantOption":{"name":"color","value":"FED Green"}}',
			},
			{
				id: 'filter.v.option.color.reactive-blue',
				label: 'Reactive Blue',
				count: 5,
				input: '{"variantOption":{"name":"color","value":"Reactive Blue"}}',
			},
			{
				id: 'filter.v.option.color.sea-green-desert',
				label: 'Sea Green / Desert',
				count: 1,
				input:
					'{"variantOption":{"name":"color","value":"Sea Green \\/ Desert"}}',
			},
			{
				id: 'filter.v.option.color.syntax',
				label: 'Syntax',
				count: 2,
				input: '{"variantOption":{"name":"color","value":"Syntax"}}',
			},
		],
	},
	{
		id: 'filter.v.option.material',
		label: 'Material',
		type: 'LIST',
		values: [
			{
				id: 'filter.v.option.material.carbon-fiber',
				label: 'Carbon-fiber',
				count: 1,
				input: '{"variantOption":{"name":"material","value":"Carbon-fiber"}}',
			},
			{
				id: 'filter.v.option.material.fiberglass',
				label: 'Fiberglass',
				count: 1,
				input: '{"variantOption":{"name":"material","value":"Fiberglass"}}',
			},
			{
				id: 'filter.v.option.material.kevlar',
				label: 'Kevlar®',
				count: 1,
				input: '{"variantOption":{"name":"material","value":"Kevlar®"}}',
			},
			{
				id: 'filter.v.option.material.polycarbonate',
				label: 'Polycarbonate',
				count: 1,
				input: '{"variantOption":{"name":"material","value":"Polycarbonate"}}',
			},
			{
				id: 'filter.v.option.material.polyethylene',
				label: 'Polyethylene',
				count: 1,
				input: '{"variantOption":{"name":"material","value":"Polyethylene"}}',
			},
			{
				id: 'filter.v.option.material.ultra-high-molecular-weight-polyethylene',
				label: 'Ultra-high-molecular-weight polyethylene',
				count: 1,
				input:
					'{"variantOption":{"name":"material","value":"Ultra-high-molecular-weight polyethylene"}}',
			},
			{
				id: 'filter.v.option.material.vectran',
				label: 'Vectran®',
				count: 1,
				input: '{"variantOption":{"name":"material","value":"Vectran®"}}',
			},
			{
				id: 'filter.v.option.material.wood-composite',
				label: 'Wood-composite',
				count: 1,
				input: '{"variantOption":{"name":"material","value":"Wood-composite"}}',
			},
		],
	},
	{
		id: 'filter.v.option.size',
		label: 'Size',
		type: 'LIST',
		values: [
			{
				id: 'filter.v.option.size.154cm',
				label: '154cm',
				count: 28,
				input: '{"variantOption":{"name":"size","value":"154cm"}}',
			},
			{
				id: 'filter.v.option.size.158cm',
				label: '158cm',
				count: 27,
				input: '{"variantOption":{"name":"size","value":"158cm"}}',
			},
			{
				id: 'filter.v.option.size.160cm',
				label: '160cm',
				count: 27,
				input: '{"variantOption":{"name":"size","value":"160cm"}}',
			},
		],
	},
	{
		id: 'filter.p.m.metafields-tests.boolean',
		label: 'boolean',
		type: 'BOOLEAN',
		values: [
			{
				id: 'filter.p.m.metafields-tests.boolean.0',
				label: 'No',
				count: 1,
				input:
					'{"productMetafield":{"namespace":"metafields-tests","key":"boolean","value":"false"}}',
			},
		],
	},
];

const mockedCollection = [
	{
		title: 'Freestyle Collection',
		handle: 'freestyle',
	},
	{
		title: 'Backcountry Collection',
		handle: 'backcountry',
	},
	{
		title: 'Thermals and Layers',
		handle: 'thermals-and-layers',
	},
	{
		title: 'Insulated and Puffy Jackets',
		handle: 'insulated-and-puffy-jackets',
	},
	{
		title: 'Hats and Accessories',
		handle: 'hats-and-accessories',
	},
	{
		title: 'Winter 2022 Collection',
		handle: 'winter-2022',
	},
	{
		title: 'Freeride',
		handle: 'freeride',
	},
];

const NoAppliedFilters: StoryFn = () => (
	<SortFilter
		filters={mockedFilters as Filter[]}
		appliedFilters={[]}
		collections={mockedCollection as Collection[]}
	>
		<div>Content to filter and sort</div>
	</SortFilter>
);

export const Default = NoAppliedFilters.bind({});

const WithAppliedFilters: StoryFn = () => (
	<SortFilter
		filters={mockedFilters as Filter[]}
		appliedFilters={[
			{
				label: 'In stock',
				urlParam: {
					key: 'available',
					value: 'true',
				},
			},
		]}
		collections={mockedCollection as Collection[]}
	>
		<div>Content to filter and sort</div>
	</SortFilter>
);

export const WithFilters = WithAppliedFilters.bind({});
