import { getInputStyleClasses } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { createCustomer, loginCustomer } from '@/lib/shopify';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import FormButton from '../component/FormButton';
import FormFooter from '../component/FormFooter';
import FormHeader from '../component/FormHeader';
import AuthLayout from '../component/AuthLayout';

let emailError: string | null = null;
let passwordError: string | null = null;

export default function RegisterPage() {
	async function handleSubmit(data: FormData) {
		'use server';
		const res = await createCustomer({
			variables: {
				input: {
					email: data.get('email') as string,
					password: data.get('password') as string,
				},
			},
		});

		if (res.body.data.customerCreate.customer) {
			const loginRes = await loginCustomer({
				variables: {
					input: {
						email: data.get('email') as string,
						password: data.get('password') as string,
					},
				},
			});

			if (
				loginRes.body.data.customerAccessTokenCreate.customerAccessToken
					?.accessToken
			) {
				cookies().set({
					name: 'customerAccessToken',
					value:
						loginRes.body.data.customerAccessTokenCreate.customerAccessToken
							.accessToken,
					httpOnly: true,
					path: '/',
					expires: new Date(Date.now() + 20 * 60 * 1000 + 5 * 1000),
				});
				redirect('/account');
			}

			redirect('/account/login');
		}

		if (res.body.data.customerCreate.customerUserErrors.length > 0) {
			res.body.data.customerCreate.customerUserErrors.filter((error: any) => {
				if (error.field.includes('email')) {
					emailError = error.message;
				}
				if (error.field.includes('password')) {
					passwordError = error.message;
				}
			});
		}

		revalidatePath('/account/register');
	}

	return (
		<AuthLayout>
			<FormHeader title="Create an Account" />
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
				<div>
					<input
						className={`mb-1 ${getInputStyleClasses(passwordError)}`}
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						placeholder="Password"
						aria-label="Password"
						minLength={8}
						required
						autoFocus
					/>
					{passwordError && (
						<p className="text-red-500 text-xs"> {passwordError} &nbsp;</p>
					)}
				</div>
				<FormButton btnText="Create Account" />
				<FormFooter page="register" />
			</form>
		</AuthLayout>
	);
}
