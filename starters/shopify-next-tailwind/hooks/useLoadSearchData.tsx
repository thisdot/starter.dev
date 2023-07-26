'use client';
import {
	Collection,
	Product,
	ShopifyFeaturedCollectionOperation,
	ShopifyFeaturedProductOperation,
} from '@/lib/shopify/types';
import { PageInfo } from 'next/dist/build/utils';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-use';

const useLoadSearchData = () => {
	const { search } = useLocation();
	const [loadingSearchedProducts, setLoadingSearchedProducts] = useState(true);
	const [products, setProducts] = useState<Product[]>([]);
	const [pageInfo, setPageInfo] = useState<PageInfo | any>(null);
	const [featuredProducts, setfeaturedProducts] = useState<Product[]>([]);
	const [featuredCollections, setfeaturedCollections] = useState<Collection[]>(
		[]
	);

	useEffect(() => {
		fetch('/api/search').then(res => {
			res.json().then(
				({
					featuredProductsResponse,
					featuredCollectionsResponse,
				}: {
					featuredProductsResponse: {
						status: number;
						body: ShopifyFeaturedProductOperation;
					};
					featuredCollectionsResponse: {
						status: number;
						body: ShopifyFeaturedCollectionOperation;
					};
				}) => {
					if (featuredProductsResponse.status === 200) {
						setfeaturedProducts(
							featuredProductsResponse.body.data.products.nodes
						);
					}
					if (featuredCollectionsResponse.status === 200) {
						setfeaturedCollections(
							featuredCollectionsResponse.body.data.collections.nodes
						);
					}
				}
			);
		});
	}, [search]);

	useEffect(() => {
		const query = new URLSearchParams(search);
		if (query.get('q') !== undefined) {
			setLoadingSearchedProducts(true);
			fetch(`/api/search?q=${query.get('q')}`, {
				method: 'POST',
			})
				.then(res => {
					res.json().then(({ products, pageInfo }) => {
						setProducts(products);
						setPageInfo(pageInfo);
						setLoadingSearchedProducts(false);
					});
				})
				.catch(() => {
					setLoadingSearchedProducts(false);
				});
		}
	}, [search]);

	return {
		products,
		pageInfo,
		featuredProducts,
		featuredCollections,
		loadingSearchedProducts,
	};
};

export default useLoadSearchData;
