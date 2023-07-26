import { getInputStyleClasses } from '@/lib/utils';
import FormModal from './FormModal';
import {
	MailingAddress,
	MailingAddressInput,
	Maybe,
} from '@/lib/shopify/types';
import FormButton from '@/app/account/component/FormButton';
import { cookies } from 'next/headers';
import { addAddress, updateAddress, updateDefaultAddress } from '@/lib/shopify';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Button } from './Button';

interface IAddressForm {
	isNewAddress: boolean;
	address?: MailingAddress;
	defaultAddress?: Maybe<MailingAddress>;
}

let formError: string | null = null;

function AddressForm({ isNewAddress, address, defaultAddress }: IAddressForm) {
	const handleSubmit = async (formData: FormData) => {
		'use server';
		formError = null;

		const token = cookies().get('customerAccessToken')?.value as string;
		const addressInput: MailingAddressInput = {};

		const keys: (keyof MailingAddressInput)[] = [
			'lastName',
			'firstName',
			'address1',
			'address2',
			'city',
			'province',
			'country',
			'zip',
			'phone',
			'company',
		];

		keys.forEach(key => {
			const value = formData.get(key);
			if (typeof value === 'string') {
				addressInput[key] = value;
			}
		});

		const defaultAddress = formData.get('defaultAddress') as string;

		if (isNewAddress) {
			try {
				const addAddressResponse = await addAddress({
					variables: {
						address: addressInput,
						customerAccessToken: token,
					},
				});
				const customerAddressCreate =
					addAddressResponse.body.data.customerAddressCreate;
				const customerAddress = customerAddressCreate.customerAddress;
				const customerUserErrors = customerAddressCreate.customerUserErrors;

				if (customerAddress && defaultAddress) {
					await updateDefaultAddress({
						variables: {
							addressId: customerAddress.id,
							customerAccessToken: token,
						},
					});
				}

				customerUserErrors.forEach(({ message }) => {
					formError = message;
				});
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const updateAddressResponse = await updateAddress({
					variables: {
						address: addressInput,
						customerAccessToken: token,
						id: decodeURIComponent(address?.id as any),
					},
				});
				const customerAddressCreate =
					updateAddressResponse.body.data.customerAddressUpdate;
				const customerAddress = customerAddressCreate.customerAddress;
				const customerUserErrors = customerAddressCreate.customerUserErrors;

				if (customerAddress && defaultAddress) {
					await updateDefaultAddress({
						variables: {
							addressId: customerAddress.id,
							customerAccessToken: token,
						},
					});
				}

				customerUserErrors.forEach(({ message }) => {
					formError = message;
				});
			} catch (error) {
				console.log(error);
			}
		}

		revalidatePath('/account');

		if (!formError) {
			redirect('/account');
		}
	};

	async function handleCleanError() {
		'use server';
		formError = null;
		revalidatePath(`/account/address/${isNewAddress ? 'add' : address?.id}`);
		redirect('/account');
	}

	return (
		<FormModal
			heading={isNewAddress ? 'Add address' : 'Edit address'}
			action={handleCleanError}
		>
			<form action={handleSubmit}>
				{formError && (
					<div className="flex items-center justify-center mb-6 bg-red-100 rounded">
						<p className="m-4 text-sm text-red-900">{formError}</p>
					</div>
				)}
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="firstName"
						name="firstName"
						required
						type="text"
						autoComplete="given-name"
						placeholder="First name"
						aria-label="First name"
						defaultValue={address?.firstName ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="lastName"
						name="lastName"
						required
						type="text"
						autoComplete="family-name"
						placeholder="Last name"
						aria-label="Last name"
						defaultValue={address?.lastName ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="company"
						name="company"
						type="text"
						autoComplete="organization"
						placeholder="Company"
						aria-label="Company"
						defaultValue={address?.company ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="address1"
						name="address1"
						type="text"
						autoComplete="address-line1"
						placeholder="Address line 1*"
						required
						aria-label="Address line 1"
						defaultValue={address?.address1 ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="address2"
						name="address2"
						type="text"
						autoComplete="address-line2"
						placeholder="Address line 2"
						aria-label="Address line 2"
						defaultValue={address?.address2 ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="city"
						name="city"
						type="text"
						required
						autoComplete="address-level2"
						placeholder="City"
						aria-label="City"
						defaultValue={address?.city ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="province"
						name="province"
						type="text"
						autoComplete="address-level1"
						placeholder="State / Province"
						required
						aria-label="State"
						defaultValue={address?.province ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="zip"
						name="zip"
						type="text"
						autoComplete="postal-code"
						placeholder="Zip / Postal Code"
						required
						aria-label="Zip"
						defaultValue={address?.zip ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="country"
						name="country"
						type="text"
						autoComplete="country-name"
						placeholder="Country"
						required
						aria-label="Country"
						defaultValue={address?.country ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="phone"
						name="phone"
						type="tel"
						autoComplete="tel"
						placeholder="Phone"
						aria-label="Phone"
						defaultValue={address?.phone ?? ''}
					/>
				</div>
				<div className="mt-4">
					<input
						type="checkbox"
						name="defaultAddress"
						id="defaultAddress"
						defaultChecked={!isNewAddress && defaultAddress?.id === address?.id}
						className="border-gray-500 rounded-sm cursor-pointer border-1"
					/>
					<label
						className="inline-block ml-2 text-sm cursor-pointer"
						htmlFor="defaultAddress"
					>
						Set as default address
					</label>
				</div>
				<div className="mt-8">
					<FormButton state="Saving" btnText="Save" />
				</div>
				<div>
					<Button
						to="/account"
						className="w-full mt-2 rounded focus:shadow-outline"
						variant="secondary"
					>
						Cancel
					</Button>
				</div>
			</form>
		</FormModal>
	);
}

export default AddressForm;
