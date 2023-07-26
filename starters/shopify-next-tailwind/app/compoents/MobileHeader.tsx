import { IconMenu, IconSearch } from '@/components/Icon';
import { Input } from '@/components/Input';
import { Link } from '@/components/Link';
import { Heading } from '@/components/Text';
import AccountLink from './AccountLink';
import CartCount from './CartCount';
import { ShopifyHeaderMenu } from '@/lib/shopify/types';
import clsx from 'clsx';
import { useSearchParam } from 'react-use';
import useAppStore from '@/store/app-store';

function MobileHeader({
	title,
	isHome,
	isUser,
	menu,
}: {
	isHome: boolean;
	isUser: boolean;
	title: string;
	menu: ShopifyHeaderMenu;
}) {
	const searchTerm = useSearchParam('q');

	return (
		<header
			role="banner"
			className={clsx(
				'flex lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8',
				{
					'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader':
						isHome,
					'bg-contrast/80 text-primary': !isHome,
				}
			)}
		>
			<div className="flex items-center justify-start w-full gap-4">
				<button
					onClick={() => useAppStore.setState({ openMenuDrawer: true })}
					className="relative flex items-center justify-center w-8 h-8"
				>
					<IconMenu />
				</button>
				<form
					method="get"
					action={'/search'}
					className="items-center gap-2 sm:flex"
				>
					<button
						type="submit"
						className="relative flex items-center justify-center w-8 h-8"
					>
						<IconSearch />
					</button>
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
				</form>
			</div>

			<Link
				className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
				href="/"
			>
				<Heading
					className="font-bold text-center leading-none"
					as={isHome ? 'h1' : 'h2'}
				>
					{title}
				</Heading>
			</Link>

			<div className="flex items-center justify-end w-full gap-4">
				<AccountLink
					className="relative flex items-center justify-center w-8 h-8"
					isUser={isUser}
				/>
				<CartCount isHome={isHome} />
			</div>
		</header>
	);
}

export default MobileHeader;
