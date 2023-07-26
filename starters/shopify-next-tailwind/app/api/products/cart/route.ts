import { getFilteredAndSortedProducts } from '@/lib/shopify';
import { NextResponse } from 'next/server';

export async function GET() {
	const data = await getFilteredAndSortedProducts({
		variables: {
			query: '',
			reverse: false,
			sortKey: 'BEST_SELLING',
			count: 4,
		},
	});

	return NextResponse.json({
		products: data.body.data.products.nodes,
	});
}
