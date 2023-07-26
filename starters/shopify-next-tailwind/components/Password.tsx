import { getInputStyleClasses } from '@/lib/utils';

function Password({
	name,
	passwordError,
	label,
}: {
	name: string;
	passwordError?: string;
	label: string;
}) {
	return (
		<div className="mt-3">
			<input
				className={getInputStyleClasses(passwordError)}
				id={name}
				name={name}
				type="password"
				autoComplete={
					name === 'currentPassword' ? 'current-password' : undefined
				}
				placeholder={label}
				aria-label={label}
				minLength={8}
			/>
		</div>
	);
}

export default Password;
