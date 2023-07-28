import './globals.css';
import './custom-font.css';
import { Inter } from 'next/font/google';

import { getLayoutData } from '@/lib/shopify';
import Footer from './compoents/Footer';
import Header from './compoents/Header';
import { cookies } from 'next/headers';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'This Dot Demo Store',
	description:
		'The best place to buy snowboarding products offered by This Dot',
	viewport: { width: 'device-width', initialScale: 1 },
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const data = await getLayoutData();
	const accessToken = cookies().get('customerAccessToken');
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="flex flex-col min-h-screen">
					<div className="">
						<a href="#mainContent" className="sr-only">
							Skip to content
						</a>
					</div>
					<Header
						menu={data.body.data.headerMenu}
						title={data.body.data.shop.name}
						isUser={Boolean(accessToken)}
					/>
					<main role="main" id="mainContent" className="flex-grow">
						{children}
					</main>
				</div>
				<Footer footerMenu={data.body.data.footerMenu} />
			</body>
		</html>
	);
}
