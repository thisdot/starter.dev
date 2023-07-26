import clsx from 'clsx';
import { useEffect, useId, useState } from 'react';
import { Product, ProductSortKeys } from '@/lib/shopify/types';
import { Heading, Text } from './Text';
import { ProductCard } from './ProductCard';
import { Skeleton } from './Skeleton';

interface FeaturedProductsProps {
	count: number;
	heading: string;
	layout?: 'drawer' | 'page';
	query?: string;
	reverse?: boolean;
	sortKey: ProductSortKeys;
}

/**
 * Display a grid of products and a heading based on some options.
 * This components uses the storefront API products query
 * @param count number of products to display
 * @param query a filtering query
 * @param reverse wether to reverse the product results
 * @param sortKey Sort the underlying list by the given key.
 * @see query https://shopify.dev/api/storefront/2023-04/queries/products
 * @see filters https://shopify.dev/api/storefront/2023-04/queries/products#argument-products-query
 */
export function FeaturedProducts({
	count = 4,
	heading = 'Shop Best Sellers',
	layout = 'drawer',
}: FeaturedProductsProps) {
	const [data, setData] = useState<{ products: Product[] } | undefined>(
		undefined
	);

	useEffect(() => {
		fetch(`/api/products/cart`).then(res => {
			res.json().then(data => {
				setData(data);
			});
		});
	}, []);

	return (
		<>
			<Heading format size="copy" className="t-4">
				{heading}
			</Heading>
			<div
				className={clsx([
					`grid grid-cols-2 gap-x-6 gap-y-8`,
					layout === 'page' ? 'md:grid-cols-4 sm:grid-col-4' : '',
				])}
			>
				<FeatureProductsContent count={count} products={data?.products} />
			</div>
		</>
	);
}

/**
 * Render the FeaturedProducts content based on the fetcher's state. "loading", "empty" or "products"
 */
function FeatureProductsContent({
	count = 4,
	products,
}: {
	count: FeaturedProductsProps['count'];
	products: Product[] | undefined;
}) {
	const id = useId();

	if (!products) {
		return (
			<>
				{[...new Array(count)].map((_, i) => (
					<div key={`${id + i}`} className="grid gap-2">
						<Skeleton className="aspect-[3/4]" />
						<Skeleton className="w-32 h-4" />
					</div>
				))}
			</>
		);
	}

	if (products?.length === 0) {
		return <Text format>No products found.</Text>;
	}

	return (
		<>
			{products.map(product => (
				<ProductCard product={product} key={product.id} quickAdd />
			))}
		</>
	);
}
