import { PAGE_BY } from '@/lib/const';
import { getAllProducts } from '@/lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const params = new URL(request.url).searchParams;

	const data = await getAllProducts({
		variables: {
			first: PAGE_BY,
			endCursor: params.get('cursor') ?? undefined,
		},
	});
	return NextResponse.json({
		products: data.body.data.products.nodes,
		pageInfo: data.body.data.products.pageInfo,
	});
}
