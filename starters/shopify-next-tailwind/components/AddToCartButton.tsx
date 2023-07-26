'use client';
import { CartLineInput } from '@/lib/shopify/types';
import { Button } from './Button';
import useCartFetcher from '@/hooks/useCartFetcher';
import useAppStore from '@/store/app-store';
export function AddToCartButton({
	children,
	lines,
	className = '',
	variant = 'primary',
	width = 'full',
	disabled,
	analytics,
	...props
}: {
	children: React.ReactNode;
	lines: CartLineInput[];
	className?: string;
	variant?: 'primary' | 'secondary' | 'inline';
	width?: 'auto' | 'full';
	disabled?: boolean;
	analytics?: unknown;
	[key: string]: any;
}) {
	const { addCatItem } = useCartFetcher();

	return (
		<Button
			onClick={() => {
				addCatItem({ variantId: lines[0].merchandiseId });
				useAppStore.setState({ openCartDrawer: true });
			}}
			as="button"
			width={width}
			variant={variant}
			className={className}
			disabled={disabled}
			{...props}
		>
			{children}
		</Button>
	);
}
