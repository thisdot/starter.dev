'use client';

import { ShopifyFooterMenu } from '@/lib/shopify/types';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { IconCaret } from '@/components/Icon';
import { Suspense } from 'react';
import { Heading, Section } from '@/components/Text';
import clsx from 'clsx';
import Image from 'next/image';

function Footer({ footerMenu }: { footerMenu: ShopifyFooterMenu }) {
	const pathname = usePathname();
	const isHome = pathname === '/';
	const menu = footerMenu;
	const itemsCount = menu?.items?.length || 0;

	return (
		<Section
			divider={isHome ? 'none' : 'top'}
			as="footer"
			role="contentinfo"
			className={`grid min-h-[25rem] items-start grid-flow-row w-full gap-6 py-8 px-6 md:px-8 lg:px-12 md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsCount}
          bg-primary dark:bg-contrast dark:text-primary text-contrast overflow-hidden`}
		>
			<FooterMenu menu={footerMenu} />
			{/* <CountrySelector /> */}
			<div className="self-end pt-8 opacity-50 md:col-span-2 lg:col-span-2">
				&copy; {new Date().getFullYear()} / This Dot Labs, Inc. Hydrogen Next.js
				13 Template is an MIT Licensed Open Source project.
			</div>
			<div className="flex justify-end self-end pt-8 md:col-span-2 lg:col-span-1">
				<a href="https://www.netlify.com">
					<Image
						src="https://www.netlify.com/v3/img/components/netlify-light.svg"
						alt="Deploys by Netlify"
						height={50}
						width={120}
					/>
				</a>
			</div>
		</Section>
	);
}

const FooterLink = ({ item, href }: { item: string; href: string }) => {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer">
			{item}
		</a>
	);
};

function FooterMenu({ menu }: { menu: ShopifyFooterMenu }) {
	const styles = {
		section: 'grid gap-4',
		nav: 'grid gap-2 pb-6',
	};

	return (
		<>
			{menu?.items?.map(item => (
				<section key={item.id} className={styles.section}>
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className="text-left md:cursor-default">
									<Heading className="flex justify-between" size="lead" as="h3">
										{item.title}
										<span className="md:hidden">
											<IconCaret direction={open ? 'up' : 'down'} />
										</span>
									</Heading>
								</Disclosure.Button>

								<div
									className={clsx(
										'overflow-hidden transition-all duration-300',
										{
											'max-h-48 h-fit': open,
											'max-h-0 md:max-h-fit': !open,
										}
									)}
								>
									<Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
										<Disclosure.Panel static>
											<nav className={styles.nav}>
												{item.items?.map(subItem => (
													<FooterLink
														key={subItem.id}
														href={subItem.url}
														item={subItem.title}
													/>
												))}
											</nav>
										</Disclosure.Panel>
									</Suspense>
								</div>
							</>
						)}
					</Disclosure>
				</section>
			))}
		</>
	);
}

export default Footer;
