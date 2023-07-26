import Image from 'next/image';
import { Link } from './Link';
import { Article } from '@/lib/shopify/types';

function ArticleCard({
	blogHandle,
	article,
}: {
	blogHandle: string;
	article: Article;
}) {
	const date = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(new Date(article.publishedAt));
	return (
		<Link href={`/${blogHandle}/${article.handle}`}>
			{article.image && (
				<div className="card-image aspect-[3/2]">
					<Image
						alt={article.image.altText || article.title}
						className="object-cover w-full"
						src={article.image.url}
						fill
					/>
				</div>
			)}
			<h2 className="mt-4 font-medium">{article.title}</h2>
			<span className="block mt-1">{date}</span>
		</Link>
	);
}

export default ArticleCard;
