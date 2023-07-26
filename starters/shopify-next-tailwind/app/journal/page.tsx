import ArticleCard from '@/components/ArticleCard';
import { Grid } from '@/components/Grid';
import { PageHeader, Section } from '@/components/Text';
import { BLOG_HANDLE, PAGE_BY } from '@/lib/const';
import { getAllPosts } from '@/lib/shopify';
import LoadMorePosts from './components/LoadMorePosts';

export default async function JournalPage() {
	const data = await getAllPosts({
		variables: {
			pageBy: PAGE_BY,
			blogHandle: BLOG_HANDLE,
		},
	});

	return (
		<>
			<PageHeader heading="Journal" />
			<Section>
				<Grid as="ol" layout="blog">
					{data.body.data.blog.articles.edges.map(article => (
						<ArticleCard
							blogHandle={BLOG_HANDLE.toLowerCase()}
							article={article.node}
							key={article.node.id}
						/>
					))}
				</Grid>
				{data.body.data.blog.articles.pageInfo?.hasNextPage && (
					<LoadMorePosts
						startCursor={data.body.data.blog.articles.pageInfo.endCursor}
					/>
				)}
			</Section>
		</>
	);
}
