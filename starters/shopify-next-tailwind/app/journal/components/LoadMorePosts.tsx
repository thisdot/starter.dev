'use client';
import ArticleCard from '@/components/ArticleCard';
import { Button } from '@/components/Button';
import { Grid } from '@/components/Grid';
import { BLOG_HANDLE } from '@/lib/const';
import { ArticleEdge } from '@/lib/shopify/types';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
	startCursor?: string | null;
}

function LoadMorePosts({ startCursor }: Props) {
	const [cursor, setCursor] = useState<string | null | undefined>(startCursor);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasNextPage, setHasNextPage] = useState<boolean>(true);
	const [posts, setPosts] = useState<ArticleEdge[]>([]);
	const { ref: nextLinkRef, inView } = useInView();
	useEffect(() => {
		if (inView && hasNextPage && !isLoading) {
			setIsLoading(true);
			fetch(`/api/posts?cursor=${cursor}`).then(res => {
				res.json().then(data => {
					setPosts(prev => [...prev, ...data.collections]);
					setHasNextPage(data.pageInfo.hasNextPage);
					setCursor(data.endCursor);
					setIsLoading(false);
				});
			});
		}
	}, [inView, hasNextPage, isLoading]);
	return (
		<>
			<Grid as="ol" layout="blog">
				{posts.map(article => (
					<ArticleCard
						blogHandle={BLOG_HANDLE.toLowerCase()}
						article={article.node}
						key={article.node.id}
					/>
				))}
			</Grid>
			<div className="flex items-center justify-center mt-6" ref={nextLinkRef}>
				{isLoading && (
					<Button variant="secondary" width="full">
						Loading
					</Button>
				)}
			</div>
		</>
	);
}

export default LoadMorePosts;
