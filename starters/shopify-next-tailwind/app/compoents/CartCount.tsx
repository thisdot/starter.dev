import { IconBag } from '@/components/Icon';
import useAppStore from '@/store/app-store';
import useCartStore from '@/store/cart-store';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';

function CartCount({ isHome }: { isHome: boolean }) {
	const cart = useCartStore(state => state.cart);

	useEffect(() => {
		const createCart = async () => {
			await fetch(`/api/cart/create`, {
				method: 'POST',
			})
				.then(async response => {
					const data = await response.json();
					if (response.status === 200) {
						useCartStore.setState({ cart: data.cart });
					}
				})
				.catch(() => null);
		};
		createCart();
	}, []);

	return <Badge dark={isHome} count={cart?.totalQuantity || 0} />;
}

function Badge({ dark, count }: { count: number; dark: boolean }) {
	const BadgeCounter = useMemo(
		() => (
			<>
				<IconBag />
				<div
					className={clsx(
						'absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px',
						{
							'text-primary bg-contrast dark:text-contrast dark:bg-primary':
								dark,
							'text-contrast bg-primary': !dark,
						}
					)}
				>
					<span>{count || 0}</span>
				</div>
			</>
		),
		[count, dark]
	);

	return (
		<button
			onClick={() => useAppStore.setState({ openCartDrawer: true })}
			className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
		>
			{BadgeCounter}
		</button>
	);
}

export default CartCount;
