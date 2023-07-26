'use client';
import { IconSearch } from '@/components/Icon';
import { Input } from '@/components/Input';
import { Link } from '@/components/Link';
import { ShopifyHeaderMenu } from '@/lib/shopify/types';

import { useSearchParam, useWindowScroll } from 'react-use';
import AccountLink from './AccountLink';
import CartCount from './CartCount';
import clsx from 'clsx';

function DesktopHeader({
	title,
	isHome,
	menu,
	isUser,
}: {
	isHome: boolean;
	title: string;
	menu: ShopifyHeaderMenu;
	isUser: boolean;
}) {
	const searchTerm = useSearchParam('q');
	const { y } = useWindowScroll();
	return (
		<header
			role="banner"
			className={clsx(
				'hidden h-nav lg:flex items-center sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8',
				{
					'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader':
						isHome,
					'bg-contrast/80 text-primary': !isHome,
					'shadow-lightHeader': !isHome && y > 50,
				}
			)}
		>
			<div className="flex gap-12">
				<Link className="font-bold" href="/">
					{title}
				</Link>
				<nav className="flex gap-8">
					{menu.items.map(item => {
						const pathname = new URL(item.url).pathname;
						return (
							<Link
								key={item.id}
								href={pathname}
								className={({ isActive }) =>
									isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
								}
							>
								{item.title}
							</Link>
						);
					})}
				</nav>
			</div>
			<div className="flex items-center gap-1">
				<form
					method="get"
					action={'/search'}
					className="flex items-center gap-2"
				>
					<Input
						defaultValue={searchTerm}
						className={
							isHome
								? 'focus:border-contrast/20 dark:focus:border-primary/20'
								: 'focus:border-primary/20'
						}
						type="search"
						variant="minisearch"
						placeholder="Search"
						name="q"
					/>
					<button
						type="submit"
						className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
					>
						<IconSearch />
					</button>
				</form>
				<AccountLink
					className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
					isUser={isUser}
				/>
				<CartCount isHome={isHome} />
			</div>
		</header>
	);
}

export default DesktopHeader;
