import { Meta, StoryFn } from '@storybook/react';

import ItemTabHeading from '../ItemTabHeading';

export default {
	title: 'Components/ItemTabHeading',
	component: ItemTabHeading,
} as Meta;

const SizeTemplate: StoryFn = () => (
	<ItemTabHeading name="Size" values={['154cm', '158cm', '160cm']} />
);

export const Size = SizeTemplate.bind({});

const BindingTemplate: StoryFn = () => (
	<ItemTabHeading name="Binding mount" values={['Nested', 'Optimistic']} />
);

export const BindingMount = BindingTemplate.bind({});
