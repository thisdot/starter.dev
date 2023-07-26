import { Link } from '@/components/Link';
import { Customer } from '@/lib/shopify/types';
import { convertObjectToQueryString } from '@/lib/utils';
function AccountDetails({ customer }: { customer: Customer }) {
	const { firstName, lastName, email, phone } = customer;
	const formattedFirstName = firstName ? firstName + ' ' : '';

	return (
		<>
			<div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
				<h3 className="font-bold text-lead">Account Details</h3>
				<div className="lg:p-8 p-6 border border-gray-200 rounded">
					<div className="flex">
						<h3 className="font-bold text-base flex-1">Profile & Security</h3>
						<Link
							className="underline text-sm font-normal"
							href={`/account?${convertObjectToQueryString({
								modal: 'account-edit',
							})}`}
						>
							Edit
						</Link>
					</div>
					<div className="mt-4 text-sm text-primary/50">Name</div>
					<p className="mt-1">
						{firstName || lastName ? formattedFirstName + lastName : 'Add name'}{' '}
					</p>

					<div className="mt-4 text-sm text-primary/50">Contact</div>
					<p className="mt-1">{phone ?? 'Add mobile'}</p>

					<div className="mt-4 text-sm text-primary/50">Email address</div>
					<p className="mt-1">{email}</p>

					<div className="mt-4 text-sm text-primary/50">Password</div>
					<p className="mt-1">**************</p>
				</div>
			</div>
		</>
	);
}

export default AccountDetails;
