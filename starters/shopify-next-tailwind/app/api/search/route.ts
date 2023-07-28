import { PAGE_BY } from '@/lib/const';
import {
	getFeaturedCollections,
	getFeaturedProducts,
	getSearchedProducts,
} from '@/lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const params = new URL(request.url).searchParams;

	const data = await getSearchedProducts({
		variables: {
			first: PAGE_BY,
			endCursor: params.get('cursor') ?? undefined,
			searchTerm: params.get('q') ?? undefined,
		},
	});
	return NextResponse.json({
		products: data.body.data.products.nodes,
		pageInfo: data.body.data.products.pageInfo,
	});
}

export async function GET(request: NextRequest) {
	const featuredProductsResponse = await getFeaturedProducts();
	const featuredCollectionsResponse = await getFeaturedCollections();

	return NextResponse.json({
		featuredProductsResponse,
		featuredCollectionsResponse,
	});
}
