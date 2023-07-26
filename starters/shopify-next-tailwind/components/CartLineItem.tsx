import { Heading, Text } from './Text';
import { Link } from './Link';
import { IconRemove } from './Icon';
import { Money } from './MoneyComponent';
import NumericIput from './NumericInput';
import Image from 'next/image';

type IAction = 'plus' | 'minus';
interface ICartLineItem {
	line: any;
	adjustItemQuantity: (action: IAction) => void;
	deleteItem: () => void;
}

const CartLineItem = ({
	line,
	adjustItemQuantity,
	deleteItem,
}: ICartLineItem) => {
	if (!line?.id) return null;

	const { id, quantity, merchandise } = line;

	if (typeof quantity === 'undefined' || !merchandise?.product) return null;

	return (
		<li key={id} className="flex gap-4">
			<div className="flex-shrink">
				{merchandise.image && (
					<Image
						width={110}
						height={110}
						src={merchandise.image.url}
						className="object-cover object-center w-24 h-24 border rounded md:w-28 md:h-28"
						alt={merchandise.title}
					/>
				)}
			</div>

			<div className="flex justify-between flex-grow">
				<div className="grid gap-2">
					<Heading as="h3" size="copy">
						{merchandise?.product?.handle ? (
							<Link href={`/products/${merchandise.product.handle}`}>
								{merchandise?.product?.title || ''}
							</Link>
						) : (
							<Text>{merchandise?.product?.title || ''}</Text>
						)}
					</Heading>

					<div className="grid pb-2">
						{(merchandise?.selectedOptions || []).map((option: any) => (
							<Text color="subtle" key={option.name}>
								{option.name}: {option.value}
							</Text>
						))}
					</div>

					<div className="flex items-center gap-2">
						<div className="flex justify-start text-copy">
							<NumericIput line={line} onClick={adjustItemQuantity} />
						</div>
						<button
							className="flex items-center justify-center w-10 h-10 border rounded"
							type="submit"
							onClick={deleteItem}
						>
							<span className="sr-only">Remove</span>
							<IconRemove aria-hidden="true" />
						</button>
					</div>
				</div>
				<Text>
					<CartLinePrice line={line} as="span" />
				</Text>
			</div>
		</li>
	);
};

export default CartLineItem;

function CartLinePrice({
	line,
	priceType = 'regular',
	...passthroughProps
}: {
	line: any;
	priceType?: 'regular' | 'compareAt';
	[key: string]: any;
}) {
	if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

	const moneyV2 =
		priceType === 'regular'
			? line.cost.totalAmount
			: line.cost.compareAtAmountPerQuantity;

	if (moneyV2 == null) {
		return null;
	}

	return <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />;
}
