import { getInputStyleClasses } from '@/lib/utils';
import FormHeader from '../component/FormHeader';
import FormFooter from '../component/FormFooter';
import FormButton from '../component/FormButton';
import { revalidatePath } from 'next/cache';
import { recoverCustomersPassword } from '@/lib/shopify';
import AuthLayout from '../component/AuthLayout';

let emailError: string | null = null;
let isSubmitted: boolean = false;
const headings = {
	submited: {
		title: 'Request Sent.',
		description:
			'If that email address is in our system, you will receive an email with instructions about how to reset your password in a few minutes.',
	},
	default: {
		title: 'Forgot Password.',
		description:
			'Enter the email address associated with your account to receive a link to reset your password.',
	},
};

export default function RecoverPassword() {
	async function handleSubmit(data: FormData) {
		'use server';
		try {
			const response = await recoverCustomersPassword({
				variables: {
					email: data.get('email') as string,
				},
			});

			if (response.body.data.customerRecover.customerUserErrors.length > 0) {
				response.body.data.customerRecover.customerUserErrors.forEach(
					(error: any) => {
						if (error.field?.includes('email')) {
							emailError = error.message;
						}
					}
				);
			} else {
				isSubmitted = true;
			}
		} catch (error) {
			interface ERROR {
				message: string;
			}
			const err = error as { error: ERROR };
			emailError = err.error.message;
		}

		revalidatePath('/account/recover');
	}

	return (
		<AuthLayout>
			<FormHeader
				title={headings[isSubmitted ? 'submited' : 'default'].title}
			/>
			<p className="mt-4">
				{headings[isSubmitted ? 'submited' : 'default'].description}
			</p>
			{!isSubmitted && (
				<form
					action={handleSubmit}
					noValidate
					className="pt-6 pb-8 mt-4 mb-4 space-y-3"
				>
					<div>
						<input
							className={`mb-1 ${getInputStyleClasses(emailError)}`}
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							placeholder="Email address"
							aria-label="Email address"
							autoFocus
						/>
						{emailError && (
							<p className="text-red-500 text-xs">{emailError} &nbsp;</p>
						)}
					</div>
					<FormButton btnText={'Request Reset Link'} />
					<FormFooter page="recover" />
				</form>
			)}
		</AuthLayout>
	);
}
