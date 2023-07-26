import ProductGallery from '@/components/ProductGallery';
import { ProductSwimlane } from '@/components/ProductSwimlane';
import { Heading, Section, Text } from '@/components/Text';
import { getProduct, getProductRecommendations } from '@/lib/shopify';
import ProductDetail from '../components/ProductDetails';
import { getExcerpt } from '@/lib/utils';
import { truncate } from '@/lib/truncate';
import Head from 'next/head';
import { Product, ProductVariant, ShopType } from '@/lib/shopify/types';
import ProductForm from './components/ProductForm';

export default async function Product({
	params,
	searchParams,
}: {
	params: { productHandle: string };
	searchParams: Record<string, string>;
}) {
	const search = new URLSearchParams(searchParams);

	const selectedOptions: Record<string, string>[] = [];
	search.forEach((value, name) => {
		selectedOptions.push({ name, value });
	});

	const {
		shop,
		product,
	}: {
		shop: ShopType;
		product: Product & { selectedVariant: ProductVariant };
	} = await getProduct(params.productHandle, selectedOptions);

	const url = `/products/${product.handle}`;
	const STORE_DOMAIN = `${process.env.PUBLIC_STORE_DOMAIN!}`;

	const firstVariant = product.variants.nodes[0];
	const selectedVariant = product.selectedVariant ?? firstVariant;

	const description = truncate(
		product?.seo?.description ?? product?.description ?? ''
	);

	const variants = product.variants.nodes;
	const offers: any[] = (variants || []).map((variant: any) => {
		for (const option of variant.selectedOptions) {
			search.set(option.name, option.value);
		}
		const availability = variant.availableForSale
			? 'https://schema.org/InStock'
			: 'https://schema.org/OutOfStock';

		return {
			'@type': 'Offer',
			availability,
			price: parseFloat(variant.price.amount),
			priceCurrency: variant.price.currencyCode,
			sku: variant?.sku ?? '',
			url,
		};
	});

	const seo = {
		openGraph: {
			title: product?.seo?.title ?? product?.title,
			description,
			type: 'website',
			url,
			image: selectedVariant?.image,
		},
		title: product?.seo?.title ?? product?.title,
		description,
		media: selectedVariant?.image,
		jsonLd: [
			{
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Products',
						item: `${STORE_DOMAIN}/products`,
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: product.title,
					},
				],
			},
			{
				'@context': 'https://schema.org',
				'@type': 'Product',
				brand: {
					'@type': 'Brand',
					name: product.vendor,
				},
				description,
				image: [selectedVariant?.image?.url ?? ''],
				name: product.title,
				offers,
				sku: selectedVariant?.sku ?? '',
				url,
			},
		],
	};

	const { media, title, vendor, descriptionHtml, id } = product;
	const { shippingPolicy, refundPolicy } = shop;
	const relatedProducts = await getProductRecommendations(id);

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
				{seo.openGraph?.image && (
					<meta property="og:image" content={seo.openGraph?.image.url} />
				)}
				<script type="application/ld+json">{JSON.stringify(seo.jsonLd)}</script>
			</Head>
			<Section className="px-0 md:px-8 lg:px-12">
				<div className="grid items-start md:gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
					<ProductGallery
						media={media.nodes}
						className="w-full lg:col-span-2"
					/>
					<div className="sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll">
						<section className="flex flex-col w-full max-w-xl gap-8 p-6 md:mx-auto md:max-w-sm md:px-0">
							<div className="grid gap-2">
								<Heading as="h1" className="whitespace-normal">
									{title}
								</Heading>
								{vendor && (
									<Text className={'opacity-50 font-medium'}>{vendor}</Text>
								)}
							</div>
							{product && <ProductForm product={product} />}
							<div className="grid gap-4 py-4">
								{descriptionHtml && (
									<ProductDetail
										title="Product Details"
										content={descriptionHtml}
									/>
								)}
								{shippingPolicy?.body && (
									<ProductDetail
										title="Shipping"
										content={getExcerpt(shippingPolicy.body)}
										learnMore={`/policies/${shippingPolicy.handle}`}
									/>
								)}
								{refundPolicy?.body && (
									<ProductDetail
										title="Returns"
										content={getExcerpt(refundPolicy.body)}
										learnMore={`/policies/${refundPolicy.handle}`}
									/>
								)}
							</div>
						</section>
					</div>
				</div>
			</Section>
			{relatedProducts && (
				<ProductSwimlane title="Related Products" products={relatedProducts} />
			)}
		</>
	);
}
