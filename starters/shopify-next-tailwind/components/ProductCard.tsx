'use client';
import clsx from 'clsx';
import { getProductPlaceholder } from '@/lib/placeholders';
import type {
	Money,
	Product,
	ShopifyAnalyticsProduct,
} from '@/lib/shopify/types';
import { Link } from './Link';
import { Text } from './Text';
import Image from 'next/image';
import { Money as MoneyComponent } from './MoneyComponent';
import { isDiscounted, isNewArrival } from '@/lib/utils';
import { AddToCartButton } from './AddToCartButton';
import { useMoney } from '@/lib/useMoney';
import { flattenConnection } from '@/lib/flattenConnection';
import useAppStore from '@/store/app-store';

export const ProductCard = ({
	product,
	label,
	className,
	quickAdd,
}: {
	product: Product;
	label?: string;
	className?: string;
	quickAdd?: boolean;
}) => {
	let cardLabel;

	const cardProduct: Product = product?.variants
		? product
		: getProductPlaceholder();
	if (!cardProduct?.variants?.nodes?.length) return null;

	const firstVariant = flattenConnection(cardProduct.variants)[0];

	if (!firstVariant) return null;
	const { image, price, compareAtPrice } = firstVariant;

	if (label) {
		cardLabel = label;
	} else if (isDiscounted(price as Money, compareAtPrice as Money)) {
		cardLabel = 'Sale';
	} else if (isNewArrival(product.publishedAt)) {
		cardLabel = 'New';
	}

	const productAnalytics: ShopifyAnalyticsProduct = {
		productGid: product.id,
		variantGid: firstVariant.id,
		name: product.title,
		variantName: firstVariant.title,
		brand: product.vendor,
		price: firstVariant.price.amount,
		quantity: 1,
	};

	return (
		<div className="flex flex-col gap-2">
			<Link
				onClick={() => useAppStore.setState({ openCartDrawer: false })}
				href={`/products/${product.handle}`}
				prefetch
			>
				<div className={clsx('grid gap-4', className)}>
					<div className="card-image aspect-[4/5] bg-primary/5">
						{image && (
							<Image
								src={image.url}
								className="object-cover w-full fadeIn"
								sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
								alt={image.altText || `Picture of ${product.title}`}
								width={25}
								height={45}
							/>
						)}
						<Text
							as="label"
							size="fine"
							className="absolute top-0 right-0 m-4 text-right text-notice"
						>
							{cardLabel}
						</Text>
					</div>
					<div className="grid gap-1">
						<Text
							className="w-full overflow-hidden whitespace-nowrap text-ellipsis "
							as="h3"
						>
							{product.title}
						</Text>
						<div className="flex gap-4">
							<Text className="flex gap-4">
								<MoneyComponent withoutTrailingZeros data={price} />
								{isDiscounted(price as Money, compareAtPrice as Money) && (
									<CompareAtPrice
										className={'opacity-50'}
										data={compareAtPrice as Money}
									/>
								)}
							</Text>
						</div>
					</div>
				</div>
			</Link>

			{quickAdd && (
				<AddToCartButton
					lines={[
						{
							quantity: 1,
							merchandiseId: firstVariant.id,
						},
					]}
					variant="secondary"
					className="mt-2"
					analytics={{
						products: [productAnalytics],
						totalValue: parseFloat(productAnalytics.price),
					}}
				>
					<Text
						as="span"
						className="flex items-center wide justify-center gap-2"
					>
						Add to Bag
					</Text>
				</AddToCartButton>
			)}
		</div>
	);
};

const CompareAtPrice = ({
	data,
	className,
}: {
	data: Money;
	className?: string;
}) => {
	const { currencyNarrowSymbol, withoutTrailingZerosAndCurrency } = useMoney(
		data,
		'en'
	);

	const styles = clsx('strike', className);

	return (
		<span className={styles}>
			{currencyNarrowSymbol}
			{withoutTrailingZerosAndCurrency}
		</span>
	);
};
