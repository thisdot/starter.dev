import { FiltersQueryParams } from '@/app/collections/[collectionHandle]/page';
import { AppliedFilter, SortParam } from '@/components/SortFilter';

export const handleCollectionProductsSearchParams = (
	params: Record<string, string>
) => {
	const urlSearchParams = new URLSearchParams(params);

	const variantOption = 'variantOption';
	const { sortKey, reverse } = getSortValuesFromParam(
		urlSearchParams.get('sort') as SortParam
	);
	const cursor = urlSearchParams.get('cursor');
	const knownFilters = ['productVendor', 'productType'];
	const available = 'available';

	const filters: FiltersQueryParams = [];
	const appliedFilters: AppliedFilter[] = [];

	for (const [key, value] of Array.from(urlSearchParams.entries())) {
		if (available === key) {
			filters.push({ available: value === 'true' });
			appliedFilters.push({
				label: value === 'true' ? 'In stock' : 'Out of stock',
				urlParam: {
					key: available,
					value,
				},
			});
		} else if (knownFilters.includes(key)) {
			filters.push({ [key]: value });
			appliedFilters.push({ label: value, urlParam: { key, value } });
		} else if (key.includes(variantOption)) {
			const [name, val] = value.split(':');
			filters.push({ variantOption: { name, value: val } });
			appliedFilters.push({ label: val, urlParam: { key, value } });
		}
	}
	// Builds min and max price filter since we can't stack them separately into
	// the filters array. See price filters limitations:
	// https://shopify.dev/custom-storefronts/products-collections/filter-products#limitations
	if (urlSearchParams.has('minPrice') || urlSearchParams.has('maxPrice')) {
		const price: { min?: number; max?: number } = {};
		if (urlSearchParams.has('minPrice')) {
			price.min = Number(urlSearchParams.get('minPrice')) || 0;
			appliedFilters.push({
				label: `Min: $${price.min}`,
				urlParam: { key: 'minPrice', value: urlSearchParams.get('minPrice')! },
			});
		}
		if (urlSearchParams.has('maxPrice')) {
			price.max = Number(urlSearchParams.get('maxPrice')) || 0;
			appliedFilters.push({
				label: `Max: $${price.max}`,
				urlParam: { key: 'maxPrice', value: urlSearchParams.get('maxPrice')! },
			});
		}
		filters.push({
			price,
		});
	}

	return {
		sortKey,
		reverse,
		cursor,
		filters,
		appliedFilters,
	};
};

function getSortValuesFromParam(sortParam: SortParam | null) {
	switch (sortParam) {
		case 'price-high-low':
			return {
				sortKey: 'PRICE',
				reverse: true,
			};
		case 'price-low-high':
			return {
				sortKey: 'PRICE',
				reverse: false,
			};
		case 'best-selling':
			return {
				sortKey: 'BEST_SELLING',
				reverse: false,
			};
		case 'newest':
			return {
				sortKey: 'CREATED',
				reverse: true,
			};
		case 'featured':
			return {
				sortKey: 'MANUAL',
				reverse: false,
			};
		default:
			return {
				sortKey: 'RELEVANCE',
				reverse: false,
			};
	}
}
