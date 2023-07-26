import { Button } from '@/components/Button';
import { FeaturedSection } from '@/components/FeaturedSection';
import { PageHeader, Text } from '@/components/Text';
import { getFeaturedProducts, getFeaturedCollections } from '@/lib/shopify';

export default async function NotFound() {
	const featuredProductsResponse = await getFeaturedProducts();
	const featuredCollectionsResponse = await getFeaturedCollections();

	const heading = `We've lost this page`;
	const description = `We couldn't find the page you're looking for. Try checking the URL or heading back to the home page.`;

	return (
		<>
			<PageHeader heading={heading}>
				<Text width="narrow" as="p">
					{description}
				</Text>
				<Button as="a" width="auto" variant="secondary" to={'/'}>
					Take me to the home page
				</Button>
			</PageHeader>
			<FeaturedSection
				featuredProducts={featuredProductsResponse.body.data.products.nodes}
				featuredCollections={
					featuredCollectionsResponse.body.data.collections.nodes
				}
			/>
		</>
	);
}
