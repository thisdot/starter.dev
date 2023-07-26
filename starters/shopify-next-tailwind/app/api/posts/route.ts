import { BLOG_HANDLE, PAGE_BY } from '@/lib/const';
import { getAllPosts } from '@/lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const params = new URL(request.url).searchParams;

	const data = await getAllPosts({
		variables: {
			blogHandle: BLOG_HANDLE,
			pageBy: PAGE_BY,
			cursor: params.get('cursor') ?? undefined,
		},
	});
	return NextResponse.json({
		posts: data.body.data.blog.articles.edges,
		pageInfo: data.body.data.blog.articles.pageInfo,
	});
}
