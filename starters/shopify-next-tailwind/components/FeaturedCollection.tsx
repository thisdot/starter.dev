import CollectionCard from './CollectionCard';
import { Section } from './Text';
import { Grid } from './Grid';
import { Collection } from '@/lib/shopify/types';

export function FeaturedCollections({
	collections,
	title = 'Collections',
	...props
}: {
	collections: Collection[];
	title?: string;
	[key: string]: any;
}) {
	const haveCollections = collections && collections.length > 0;
	if (!haveCollections) return null;
	const items = collections.filter(item => item.image).length;

	return (
		<Section {...props} heading={title}>
			<Grid items={items}>
				{collections.map(collection => {
					if (!collection?.image) {
						return null;
					}
					return <CollectionCard collection={collection} key={collection.id} />;
				})}
			</Grid>
		</Section>
	);
}
