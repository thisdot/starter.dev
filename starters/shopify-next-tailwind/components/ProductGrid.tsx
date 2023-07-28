'use client';
import { Product } from '@/lib/shopify/types';
import { Grid } from './Grid';
import { ProductCard } from './ProductCard';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import { handleCollectionProductsSearchParams } from '@/lib/handleCollectionProductsSearchParams';
import { Link } from './Link';

export default function ProductGrid({ ...props }: { handle: string }) {
	const [cursor, setCursor] = useState<string | null | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasNextPage, setHasNextPage] = useState<boolean>(false);
	const { ref: nextLinkRef, inView } = useInView();
	const [products, setProducts] = useState<Product[]>([]);
	const searchParams = useSearchParams();

	useEffect(() => {
		if (inView && hasNextPage && !isLoading) {
			const { sortKey, reverse, filters } =
				handleCollectionProductsSearchParams(Object.fromEntries(searchParams));
			const apiSearchParams = new URLSearchParams();
			if (filters) {
				apiSearchParams.set('filters', JSON.stringify(filters));
			}
			if (sortKey) {
				apiSearchParams.set('sort', sortKey);
			}
			if (reverse) {
				apiSearchParams.set('reverse', reverse.toString());
			}
			apiSearchParams.set('handle', props.handle);
			if (cursor) apiSearchParams.set('cursor', cursor);
			setIsLoading(true);
			fetch(`/api/collectionProducts?${apiSearchParams.toString()}`).then(
				res => {
					res.json().then(data => {
						setProducts(prev => [...prev, ...data.products]);
						setHasNextPage(data.pageInfo.hasNextPage);
						setCursor(data.pageInfo.endCursor);
						setIsLoading(false);
					});
				}
			);
		}
	}, [inView, hasNextPage, isLoading, searchParams, props.handle]);

	useEffect(() => {
		setProducts([]);
		setHasNextPage(false);
		setCursor(undefined);
		const { sortKey, reverse, filters } = handleCollectionProductsSearchParams(
			Object.fromEntries(searchParams)
		);
		const apiSearchParams = new URLSearchParams();
		if (filters) {
			apiSearchParams.set('filters', JSON.stringify(filters));
		}
		if (sortKey) {
			apiSearchParams.set('sort', sortKey);
		}
		if (reverse) {
			apiSearchParams.set('reverse', reverse.toString());
		}
		apiSearchParams.set('handle', props.handle);
		setIsLoading(true);
		fetch(`/api/collectionProducts?${apiSearchParams.toString()}`).then(res => {
			res.json().then(data => {
				setProducts(prev => [...prev, ...data.products]);
				setHasNextPage(data.pageInfo.hasNextPage);
				setCursor(data.pageInfo.endCursor);
				setIsLoading(false);
			});
		});
	}, [props.handle, searchParams]);

	const haveProducts = products.length > 0;

	if (!haveProducts && !isLoading) {
		return (
			<>
				<p>No products found on this collection</p>
				<Link href="/products">
					<p className="underline">Browse catalog</p>
				</Link>
			</>
		);
	}

	return (
		<>
			<Grid layout="products" {...props}>
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</Grid>
			<div className="flex items-center justify-center mt-6" ref={nextLinkRef}>
				{isLoading && (
					<Button variant="secondary" width="full">
						Loading
					</Button>
				)}
			</div>
		</>
	);
}
