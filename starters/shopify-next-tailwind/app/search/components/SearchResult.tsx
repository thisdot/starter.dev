import { Grid } from '@/components/Grid';
import { ProductCard } from '@/components/ProductCard';
import { Section } from '@/components/Text';
import { PageInfo, Product } from '@/lib/shopify/types';
import LoadMoreSearchProducts from './LoadMoreSearchProducts';

interface ISearchResult {
	products: Product[];
	pageInfo: PageInfo;
}
const SearchResult = ({ products, pageInfo }: ISearchResult) => {
	return (
		<Section>
			<Grid>
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</Grid>
			{pageInfo?.hasNextPage && (
				<LoadMoreSearchProducts startCursor={pageInfo?.endCursor} />
			)}
		</Section>
	);
};

export default SearchResult;
