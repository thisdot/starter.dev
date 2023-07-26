import { Meta, StoryFn } from '@storybook/react';
// import AddressForm from '../AddressForm';
// import { address } from './data';

export default {
	title: 'Components/AddressForm',
	// component: AddressForm,
} as Meta;

// const defaultAddress = {
// 	...address,
// };

const Template: StoryFn = () => (
	<p className="text-red-500">
		This story has compatibility issue with the latest Next version
	</p>
);
// const Template: StoryFn = () => (
// 	<AddressForm
// 		address={address}
// 		defaultAddress={defaultAddress}
// 		isNewAddress={false}
// 	/>
// );

export const Default = Template.bind({});

// const NewTemplate: StoryFn = () => <AddressForm isNewAddress={true} />;

// export const AddAddress = NewTemplate.bind({});
