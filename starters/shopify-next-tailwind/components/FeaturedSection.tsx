import { Collection, Product } from '@/lib/shopify/types';
import { FeaturedCollections } from './FeaturedCollection';
import { ProductSwimlane } from './ProductSwimlane';

interface Iprops {
	featuredCollections: Collection[];
	featuredProducts: Product[];
}
export function FeaturedSection({
	featuredCollections = [],
	featuredProducts = [],
}: Iprops) {
	return (
		<>
			{featuredCollections.length < 4 && featuredCollections.length !== 0 && (
				<FeaturedCollections
					title="Popular Collections"
					collections={featuredCollections}
				/>
			)}
			<ProductSwimlane products={featuredProducts} />
		</>
	);
}
