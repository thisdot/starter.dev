'use client';

import { Button } from '@/components/Button';
import { FeaturedSection } from '@/components/FeaturedSection';
import { PageHeader, Text } from '@/components/Text';
import {
	Collection,
	Product,
	ShopifyFeaturedCollectionOperation,
	ShopifyFeaturedProductOperation,
} from '@/lib/shopify/types';
import { Metadata } from 'next';
import { useEffect, useRef, useState } from 'react';

export const metadata: Metadata = {
	title: 'Error',
};

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	const [featuredProducts, setfeaturedProducts] = useState<Product[]>([]);
	const [featuredCollections, setfeaturedCollections] = useState<Collection[]>(
		[]
	);
	const description = useRef(`We found an error while loading this page.`);
	const heading = `Something's wrong here.`;

	useEffect(() => {
		fetch('/api/error').then(res => {
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
	}, []);

	useEffect(() => {
		if (error) {
			description.current += `\n${error.message}`;
		}
	}, [error]);

	return (
		<>
			<PageHeader heading={heading}>
				<Text width="narrow" as="p">
					{description.current}
				</Text>
				{error?.stack && (
					<pre
						style={{
							padding: '2rem',
							background: 'hsla(10, 50%, 50%, 0.1)',
							color: 'red',
							overflow: 'auto',
							maxWidth: '100%',
						}}
						dangerouslySetInnerHTML={{
							__html: addLinksToStackTrace(error.stack),
						}}
					/>
				)}
				<Button width="auto" variant="secondary" to={'/'}>
					Take me to the home page
				</Button>
			</PageHeader>
			<FeaturedSection
				featuredCollections={featuredCollections}
				featuredProducts={featuredProducts}
			/>
		</>
	);
}

function addLinksToStackTrace(stackTrace: string) {
	return stackTrace?.replace(/^\s*at\s?.*?[(\s]((\/|\w).+)\)\n/gim, (all, m1) =>
		all.replace(
			m1,
			`<a href="vscode://file${m1}" class="hover:underline">${m1}</a>`
		)
	);
}
