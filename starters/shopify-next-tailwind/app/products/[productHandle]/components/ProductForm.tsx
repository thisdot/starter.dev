import { AddToCartButton } from '@/components/AddToCartButton';
import { Button } from '@/components/Button';
import { Money } from '@/components/MoneyComponent';
import ShopPayButton from '@/components/ShopPayButton';
import { Product, ProductOption, ProductVariant } from '@/lib/shopify/types';
import { Heading, Text } from '@/components/Text';
import ItemTabHeading from '@/components/ItemTabHeading';
import ProductListBox from '@/components/ProductListBox';

const ProductForm = ({
	product,
}: {
	product: Product & { selectedVariant: ProductVariant };
}): JSX.Element => {
	const STORE_DOMAIN = `${process.env.PUBLIC_STORE_DOMAIN!}`;

	const firstVariant = product.variants.nodes[0];

	/**
	 * Likewise, we're defaulting to the first variant for purposes
	 * of add to cart if there is none returned from the loader.
	 * A developer can opt out of this, too.
	 */
	const selectedVariant = product.selectedVariant ?? firstVariant;
	const isOutOfStock = !selectedVariant?.availableForSale;

	const isOnSale =
		selectedVariant?.price?.amount &&
		selectedVariant?.compareAtPrice?.amount &&
		selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

	return (
		<div className="grid gap-10">
			<div className="grid gap-4">
				<ProductOptions options={product.options} />
				{selectedVariant && (
					<div className="grid items-stretch gap-4">
						{isOutOfStock ? (
							<Button variant="secondary" disabled>
								<Text>Sold out</Text>
							</Button>
						) : (
							<AddToCartButton
								lines={[
									{
										merchandiseId: selectedVariant.id,
										quantity: 1,
									},
								]}
								variant="primary"
								data-test="add-to-cart"
							>
								<Text
									as="span"
									className="flex items-center justify-center gap-2"
								>
									<span>Add to Cart</span> <span>·</span>{' '}
									<Money
										withoutTrailingZeros
										data={selectedVariant?.price}
										as="span"
									/>
									{isOnSale && (
										<Money
											withoutTrailingZeros
											data={selectedVariant?.compareAtPrice}
											as="span"
											className="opacity-50 strike"
										/>
									)}
								</Text>
							</AddToCartButton>
						)}
						{!isOutOfStock && (
							<ShopPayButton
								variantIds={[selectedVariant?.id]}
								width="full"
								storeDomain={STORE_DOMAIN}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

const ProductOptions = ({ options }: { options: ProductOption[] }) => {
	return (
		<>
			{options
				.filter(option => option.values.length > 1)
				.map(option => (
					<div
						key={option.name}
						className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
					>
						<Heading as="legend" size="lead" className="min-w-[4rem]">
							{option.name}
						</Heading>
						<div className="flex flex-wrap items-baseline gap-4">
							{option.values.length > 7 ? (
								<>
									<ProductListBox name={option.name} values={option.values} />
								</>
							) : (
								<>
									<ItemTabHeading name={option.name} values={option.values} />
								</>
							)}
						</div>
					</div>
				))}
		</>
	);
};

export default ProductForm;
