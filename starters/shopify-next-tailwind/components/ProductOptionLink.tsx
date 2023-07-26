'use client';
import { ReactNode, useMemo } from 'react';
import { useLocation } from 'react-use';
import { Link } from './Link';
import { usePathname } from 'next/navigation';

function ProductOptionLink({
	optionName,
	optionValue,
	children,
	...props
}: {
	optionName: string;
	optionValue: string;
	children?: ReactNode;
	[key: string]: any;
}) {
	const { search } = useLocation();
	const pathname = usePathname();

	const isLocalePathname = /\/[a-zA-Z]{2}-[a-zA-Z]{2}\//g.test(pathname);
	// fixes internalized pathname
	const path = isLocalePathname
		? `/${pathname.split('/').slice(2).join('/')}`
		: pathname;

	const searchParams = useMemo(() => {
		return search ? new URLSearchParams(search) : search;
	}, [search]);

	const clonedSearchParams = new URLSearchParams(searchParams);
	clonedSearchParams.set(optionName, optionValue);

	return (
		<Link {...props} replace href={`${path}?${clonedSearchParams.toString()}`}>
			{children ?? optionValue}
		</Link>
	);
}

export default ProductOptionLink;
