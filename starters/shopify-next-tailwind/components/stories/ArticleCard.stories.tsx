import { StoryFn, Meta } from '@storybook/react';
import { Article } from '@/lib/shopify/types';
import ArticleCard from '../ArticleCard';

export default {
	title: 'Components/ArticleCard',
	component: ArticleCard,
} as Meta;

const Template: StoryFn<{
	blogHandle: string;
	article: Article;
	loading?: HTMLImageElement['loading'];
}> = args => (
	<div
		style={{
			maxWidth: '600px',
		}}
	>
		<ArticleCard {...args} />
	</div>
);

export const Default = Template.bind({});
Default.args = {
	blogHandle: 'blog',
	article: {
		id: '1',
		title: 'Article Title',
		handle: 'article-title',
		publishedAt: '2022-01-01T00:00:00Z',
		image: {
			altText: 'Article Image',
			url: 'https://via.placeholder.com/300x200',
			width: 300,
			height: 200,
		},
	} as Article,
};
