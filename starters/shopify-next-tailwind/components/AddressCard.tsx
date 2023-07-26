import { MailingAddress } from '@/lib/shopify/types';
import { Link } from './Link';
import { revalidatePath } from 'next/cache';
import { deleteAddress } from '@/lib/shopify';
import { cookies } from 'next/headers';
import FormButton from '@/app/account/component/FormButton';
import { convertObjectToQueryString } from '@/lib/utils';

function AddressCard({
	address,
	defaultAddress,
}: {
	address: MailingAddress;
	defaultAddress?: boolean;
}) {
	const removeAddress = async (formData: FormData) => {
		'use server';
		const token = cookies().get('customerAccessToken')?.value as string;
		const id = formData.get('id') as string;
		await deleteAddress({
			variables: {
				customerAccessToken: token,
				id,
			},
		});
		revalidatePath('/account');
	};
	return (
		<div className="lg:p-8 p-6 border border-gray-200 rounded flex flex-col">
			{defaultAddress && (
				<div className="mb-3 flex flex-row">
					<span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary/50">
						Default
					</span>
				</div>
			)}
			<ul className="flex-1 flex-row">
				{(address.firstName || address.lastName) && (
					<li>
						{'' +
							(address.firstName && address.firstName + ' ') +
							address?.lastName}
					</li>
				)}
				{address.formatted?.map((line: string) => (
					<li key={line}>{line}</li>
				))}
			</ul>

			<div className="flex flex-row font-medium mt-6 items-baseline">
				<Link
					href={`/account?${convertObjectToQueryString({
						modal: 'address-edit',
						id: encodeURIComponent(address.id),
					})}`}
					className="text-left underline text-sm"
				>
					Edit
				</Link>
				<form action={removeAddress}>
					<input type="hidden" name="id" value={address.id} />
					<FormButton btnText="Remove" state="Removing" variant="outline" />
				</form>
			</div>
		</div>
	);
}

export default AddressCard;
