import { Meta, StoryFn } from '@storybook/react';
// import AddressCard from '../AddressCard';
// import { address } from './data';

export default {
	title: 'Components/AddressCard',
	// component: AddressCard,
} as Meta;

const Template: StoryFn = () => (
	<p className="text-red-500">
		This story has compatibility issue with the latest Next version
	</p>
);
// const Template: StoryFn = () => (
// 	<AddressCard address={address} defaultAddress={true} />
// );

export const Default = Template.bind({});
