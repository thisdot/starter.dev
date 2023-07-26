import { Hero } from '../components/Hero';
import { ProductSwimlane } from '@/components/ProductSwimlane';
import { FeaturedCollections } from '@/components/FeaturedCollection';
import {
	getFeaturedCollections,
	getFeaturedProducts,
	getHomepageSeo,
	getSecondaryHero,
	getTertiaryHero,
} from '@/lib/shopify';
import Head from 'next/head';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Home | This Dot Demo Store',
	robots: 'index, follow',
};

export default async function Homepage() {
	const seoStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Home page',
	};

	const primaryHero = await getHomepageSeo();
	const featuredProducts = await getFeaturedProducts();
	const secondaryHero = await getSecondaryHero();
	const featuredCollections = await getFeaturedCollections();
	const tertiaryHero = await getTertiaryHero();

	return (
		<>
			<Head>
				<script type="application/ld+json">
					{JSON.stringify(seoStructuredData)}
				</script>
			</Head>
			{primaryHero && (
				<Hero {...primaryHero.body.data.hero} height="full" top />
			)}

			{featuredProducts?.body.data.products.nodes && (
				<ProductSwimlane
					products={featuredProducts.body.data.products.nodes}
					title="Featured Products"
					count={4}
				/>
			)}

			{secondaryHero && <Hero {...secondaryHero.body.data.hero} />}

			{featuredCollections?.body.data.collections.nodes && (
				<FeaturedCollections
					collections={featuredCollections.body.data.collections.nodes}
					title="Collections"
				/>
			)}

			{tertiaryHero && <Hero {...tertiaryHero.body.data.hero} />}
		</>
	);
}
