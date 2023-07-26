import { Product } from '@/lib/shopify/types';
import { ProductCard } from './ProductCard';
import { Section } from './Text';

const mockProducts = new Array(12).fill('');

export function ProductSwimlane({
	title = 'Featured Products',
	products = mockProducts,
	count = 12,
	...props
}: {
	title?: string;
	products?: Product[];
	count?: number;
}) {
	return (
		<Section heading={title} padding="y" {...props}>
			<div className="swimlane hiddenScroll md:pb-8 md:scroll-px-8 lg:scroll-px-12 md:px-8 lg:px-12">
				{products.map(product => (
					<ProductCard
						product={product}
						key={product.id}
						className="snap-start w-80"
					/>
				))}
			</div>
		</Section>
	);
}
