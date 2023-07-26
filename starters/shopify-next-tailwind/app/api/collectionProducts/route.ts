import { FiltersQueryParams } from '@/app/collections/[collectionHandle]/page';
import { PAGE_BY } from '@/lib/const';
import { getCollectionProducts } from '@/lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const params = new URL(request.url).searchParams;

	const data = await getCollectionProducts({
		variables: {
			pageBy: PAGE_BY,
			cursor: params.get('cursor') ?? null,
			filters: params.get('filters')
				? JSON.parse(params.get('filters')!)
				: ([] as FiltersQueryParams),
			sortKey: params.get('sort') ?? 'RELEVANCE',
			handle: params.get('handle') ?? '',
			reverse: Boolean(params.get('reverse')),
		},
	});

	return NextResponse.json({
		products: data.body.data.collection.products.nodes,
		pageInfo: data.body.data.collection.products.pageInfo,
	});
}
