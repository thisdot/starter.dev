'use client';
import { usePathname } from 'next/navigation';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
type LinkProps = Omit<NextLinkProps, 'className'> & {
	className?: string | ((props: { isActive: boolean }) => string | undefined);
	children: React.ReactNode;
};

export function Link(props: LinkProps) {
	let { href, className, ...resOfProps } = props;
	const pathname = usePathname();
	let toWithLocale = href;

	if (typeof className === 'function') {
		className = className({
			isActive: pathname.includes(href.toString()),
		});
	}

	return (
		<NextLink href={toWithLocale} className={className} {...resOfProps}>
			{props.children}
		</NextLink>
	);
}
