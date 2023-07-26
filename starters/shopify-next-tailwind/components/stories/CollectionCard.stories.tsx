import { Meta, StoryFn } from '@storybook/react';
import CollectionCard from '../CollectionCard';
import { Collection } from '@/lib/shopify/types';

export default {
	title: 'Components/CollectionCard',
	component: CollectionCard,
	argTypes: {
		collection: {
			control: {
				disable: true,
			},
		},
	},
} as Meta;

const mockedCollection = {
	id: 'gid://shopify/Collection/387214442552',
	title: 'Backcountry Collection',
	handle: 'backcountry',
	image: {
		altText:
			'A skier hikes up a mountain through the snow with skis over their shoulder.',
		width: 2500,
		height: 2500,
		url: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/collections/full.png?v=1654902705',
	},
	metafields: [null],
} as Collection;

const Template: StoryFn = args => (
	<div className="flex flex-col gap-2 max-w-sm">
		<CollectionCard collection={mockedCollection} key={mockedCollection.id} />
	</div>
);

export const Default = Template.bind({});
Default.args = {
	label: 'Sale',
	quickAdd: true,
};
