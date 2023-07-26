import { PageHeader, Section } from '@/components/Text';
import { BLOG_HANDLE } from '@/lib/const';
import { getArticleByHandle } from '@/lib/shopify';
import Image from 'next/image';
import sanitizeHtml from 'sanitize-html';

export default async function JournalHandlePage({
	params,
}: {
	params: { journalHandle: string };
}) {
	const data = await getArticleByHandle({
		variables: {
			articleHandle: params.journalHandle,
			blogHandle: BLOG_HANDLE,
		},
	});

	const content = sanitizeHtml(
		data.body.data.blog.articleByHandle?.contentHtml as string
	);

	const date = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(new Date(data.body.data.blog.articleByHandle?.publishedAt!));

	return (
		<>
			<PageHeader
				heading={data.body.data.blog.articleByHandle?.title as string}
				variant="blogPost"
			>
				<span>
					{date}
					&middot; {data.body.data.blog.articleByHandle?.authorV2?.name}
				</span>
			</PageHeader>

			<Section as="article" padding="x">
				{data.body.data.blog.articleByHandle?.image?.url && (
					<Image
						src={data.body.data.blog.articleByHandle?.image?.url}
						className="w-full mx-auto mt-8 md:mt-16 max-w-7xl"
						alt={data.body.data.blog.articleByHandle?.image?.altText}
						sizes="90vw"
						height={data.body.data.blog.articleByHandle?.image?.height ?? 400}
						width={data.body.data.blog.articleByHandle?.image?.width}
					/>
				)}
				<div
					className="article"
					dangerouslySetInnerHTML={{
						__html: content,
					}}
				/>
			</Section>
		</>
	);
}
