import { IconAccount, IconLogin } from '@/components/Icon';
import { Link } from '@/components/Link';

function AccountLink({
	className,
	isUser,
}: {
	className?: string;
	isUser: boolean;
}) {
	return (
		<Link href="/account" className={className}>
			{isUser ? <IconAccount /> : <IconLogin />}
		</Link>
	);
}

export default AccountLink;
