'use client';
import { Button } from '@/components/Button';
import { Grid } from '@/components/Grid';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/lib/shopify/types';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-use';

interface Props {
	startCursor?: string | null;
}

function LoadMoreSearchProducts({ startCursor }: Props) {
	const { search } = useLocation();
	const [cursor, setCursor] = useState<string | null | undefined>(startCursor);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasNextPage, setHasNextPage] = useState<boolean>(true);
	const [products, setProducts] = useState<Product[]>([]);
	const { ref: nextLinkRef, inView } = useInView();
	useEffect(() => {
		const query = new URLSearchParams(search);
		if (inView && hasNextPage && !isLoading && query.get('q') !== undefined) {
			setIsLoading(true);
			fetch(`/api/search?q=${query.get('q')}&cursor=${cursor}`, {
				method: 'POST',
			}).then(res => {
				res.json().then(({ products, pageInfo }) => {
					setProducts(prev => [...prev, ...products]);
					setHasNextPage(pageInfo.hasNextPage);
					setCursor(pageInfo.endCursor);
					setIsLoading(false);
				});
			});
		}
	}, [inView, hasNextPage, isLoading]);

	return (
		<>
			<Grid>
				{products.map((product, i) => (
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

export default LoadMoreSearchProducts;
