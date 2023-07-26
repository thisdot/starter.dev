import { Meta, StoryFn } from '@storybook/react';
// import AccountForm from '../AccountForm';

export default {
	title: 'Components/AccountForm',
	// component: AccountForm,
} as Meta;

// const mockedCustomer = {
// 	firstName: 'Mattia',
// 	lastName: 'Magi',
// 	phone: '333333333',
// 	email: 'test.test@gmail.com',
// 	defaultAddress: null,
// 	addresses: {
// 		edges: [],
// 		nodes: [],
// 		pageInfo: {
// 			hasNextPage: false,
// 			hasPreviousPage: false,
// 		},
// 	},
// 	orders: {
// 		edges: [],
// 		nodes: [],
// 		pageInfo: {
// 			hasNextPage: false,
// 			hasPreviousPage: false,
// 		},
// 		totalCount: '0',
// 	},
// 	metafields: [],
// 	acceptsMarketing: false,
// 	createdAt: '2022-05-10T15:03:01.000Z',
// 	displayName: 'Megio',
// 	id: 'id',
// 	numberOfOrders: '0',
// 	tags: [],
// 	updatedAt: '2022-05-10T15:03:01.000Z',
// };
const Template: StoryFn = () => (
	<p className="text-red-500">
		This story has compatibility issue with the latest Next version
	</p>
);
// const Template: StoryFn = () => <AccountForm customer={mockedCustomer} />;

export const Default = Template.bind({});
