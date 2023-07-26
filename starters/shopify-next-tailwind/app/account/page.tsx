import React from 'react';
import { FeaturedSection } from '@/components/FeaturedSection';
import {
	getFeaturedProducts,
	getFeaturedCollections,
	getCustomer,
} from '@/lib/shopify';
import SignOutSection from './component/SignOutSection';
import OrderHistory from './component/OrderHistory';
import AccountDetails from '../../components/AccountDetails';
import AccountBook from './component/AccountBook';
import { cookies } from 'next/headers';
import { PageHeader } from '@/components/Text';
import { flattenConnection } from '@/lib/flattenConnection';
import { MailingAddress, Order } from '@/lib/shopify/types';
import AccountForm from '@/components/AccountForm';
import { getIdFromURL } from '@/lib/utils';
import AddressForm from '@/components/AddressForm';

async function AccountPage({
	searchParams,
}: {
	searchParams: { [key: string]: string };
}) {
	const token = cookies().get('customerAccessToken')?.value as string;
	const customer = await getCustomer(token);
	const { orders, firstName } = customer;
	const welcomeMessage = firstName
		? `Welcome, ${firstName}.`
		: `Welcome to your account.`;
	const heading = customer ? welcomeMessage : 'Account Details';

	const customerOrders = flattenConnection(orders) as Order[];
	const addresses = flattenConnection(customer.addresses) as MailingAddress[];
	const address =
		(searchParams &&
			addresses.find(res => {
				const editId = decodeURIComponent(searchParams?.id);
				const { id: editMailingId } = getIdFromURL(editId);
				const { id: mailingId } = getIdFromURL(res.id);
				return mailingId === editMailingId && searchParams?.id;
			})) ||
		undefined;

	const featuredProductsResponse = await getFeaturedProducts();
	const featuredCollectionsResponse = await getFeaturedCollections();

	return (
		<div>
			<PageHeader heading={heading}>
				<SignOutSection />
			</PageHeader>
			{customerOrders && <OrderHistory orders={customerOrders} />}
			<AccountDetails customer={customer} />
			<AccountBook addresses={addresses} customer={customer} />
			{!customerOrders.length && (
				<FeaturedSection
					featuredProducts={featuredProductsResponse.body.data.products.nodes}
					featuredCollections={
						featuredCollectionsResponse.body.data.collections.nodes
					}
				/>
			)}
			{searchParams?.modal === 'address-edit' && (
				<AddressForm
					isNewAddress={false}
					address={address}
					defaultAddress={customer.defaultAddress}
				/>
			)}
			{searchParams?.modal === 'address-add' && (
				<AddressForm
					isNewAddress={true}
					address={address}
					defaultAddress={customer.defaultAddress}
				/>
			)}
			{searchParams?.modal === 'account-edit' && (
				<AccountForm customer={customer} />
			)}
		</div>
	);
}

export default AccountPage;
