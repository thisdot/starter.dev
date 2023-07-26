import { getFeaturedProducts, getFeaturedCollections } from '@/lib/shopify';
import { NextResponse } from 'next/server';

export async function GET() {
	const featuredProductsResponse = await getFeaturedProducts();
	const featuredCollectionsResponse = await getFeaturedCollections();

	return NextResponse.json({
		featuredProductsResponse,
		featuredCollectionsResponse,
	});
}
