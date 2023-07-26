import { PageHeader, Text, Section } from '@/components/Text';
import ProductGrid from '@/components/ProductGrid';
import { Collection as CollectionType, Collection } from '@/lib/shopify/types';
import { SortFilter } from '@/components/SortFilter';
import { getCollectionProducts } from '@/lib/shopify';
import { flattenConnection } from '@/lib/flattenConnection';
import { handleCollectionProductsSearchParams } from '@/lib/handleCollectionProductsSearchParams';
import { PAGE_BY } from '@/lib/const';
import Head from 'next/head';
import { truncate } from '@/lib/truncate';

type VariantFilterParam = Record<string, string | boolean>;
type PriceFiltersQueryParam = Record<'price', { max?: number; min?: number }>;
type VariantOptionFiltersQueryParam = Record<
	'variantOption',
	{ name: string; value: string }
>;
export type FiltersQueryParams = Array<
	VariantFilterParam | PriceFiltersQueryParam | VariantOptionFiltersQueryParam
>;
export default async function Collection({
	params,
	searchParams,
}: {
	params: { collectionHandle: string };
	searchParams: Record<string, string>;
}) {
	const { sortKey, reverse, cursor, filters, appliedFilters } =
		handleCollectionProductsSearchParams(searchParams);

	const data = await getCollectionProducts({
		variables: {
			handle: params.collectionHandle,
			pageBy: PAGE_BY,
			filters,
			sortKey,
			cursor,
			reverse,
		},
	});

	const collection = data.body.data.collection;
	const collections = flattenConnection(data.body.data.collections);

	const seo = {
		title: collection?.seo?.title,
		description: truncate(
			collection?.seo?.description ?? collection?.description ?? ''
		),
		openGraph: {
			title: collection?.seo?.title,
			description: truncate(
				collection?.seo?.description ?? collection?.description ?? ''
			),
			type: 'website',
			url: `/collections/${collection.handle}`,
			images: collection?.image
				? [
						{
							url: collection?.image?.url,
							width: collection?.image?.width,
							height: collection?.image?.height,
							alt: collection?.image?.altText,
						},
				  ]
				: [],
		},
	};

	const itemListElement: CollectionType[] = collections.map(
		(collection: CollectionType, index: number) => {
			return {
				'@type': 'ListItem',
				position: index + 1,
				url: `/collections/${collection.handle}`,
			};
		}
	);

	const seoStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: 'Collections',
		description: 'All collections',
		url: seo.openGraph?.url,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement,
		},
	};

	return (
		<>
			<Head>
				<title>{seo.title}</title>
				<meta name="description" content={seo.description} />
				{seo.openGraph?.title && (
					<meta property="og:title" content={seo.openGraph.title} />
				)}
				{seo.openGraph?.description && (
					<meta property="og:description" content={seo.openGraph.description} />
				)}
				{seo.openGraph?.type && (
					<meta property="og:type" content={seo.openGraph.type} />
				)}
				{seo.openGraph?.url && (
					<meta property="og:url" content={seo.openGraph.url} />
				)}
				{seo.openGraph?.images?.map(image => (
					<meta
						property="og:image"
						content={image.url}
						key={`og-image-${image.alt}`}
					/>
				))}
				<script type="application/ld+json">
					{JSON.stringify(seoStructuredData)}
				</script>
			</Head>
			<PageHeader heading={collection.title}>
				{collection?.description && (
					<div className="flex items-baseline justify-between w-full">
						<div>
							<Text format width="narrow" as="p" className="inline-block">
								{collection.description}
							</Text>
						</div>
					</div>
				)}
			</PageHeader>
			<Section>
				<SortFilter
					filters={collection.products.filters}
					appliedFilters={appliedFilters}
					collections={collections as Collection[]}
				>
					<ProductGrid
						key={collection.id}
						data-test="product-grid"
						handle={params.collectionHandle}
					/>
				</SortFilter>
			</Section>
		</>
	);
}
