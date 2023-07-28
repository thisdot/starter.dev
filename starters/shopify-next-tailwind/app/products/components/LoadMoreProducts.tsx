'use client';
import { Button } from '@/components/Button';
import { Grid } from '@/components/Grid';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/lib/shopify/types';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
	startCursor?: string | null;
}

function LoadMoreProducts({ startCursor }: Props) {
	const [cursor, setCursor] = useState<string | null | undefined>(startCursor);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasNextPage, setHasNextPage] = useState<boolean>(true);
	const [products, setProducts] = useState<Product[]>([]);
	const { ref: nextLinkRef, inView } = useInView();
	useEffect(() => {
		if (inView && hasNextPage && !isLoading) {
			setIsLoading(true);
			fetch(`/api/products?cursor=${cursor}`).then(res => {
				res.json().then(data => {
					setProducts(prev => [...prev, ...data.products]);
					setHasNextPage(data.pageInfo.hasNextPage);
					setCursor(data.endCursor);
					setIsLoading(false);
				});
			});
		}
	}, [inView, hasNextPage, isLoading]);

	return (
		<>
			<Grid>
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

export default LoadMoreProducts;
