import { getIdFromURL, statusMessage } from '@/lib/utils';
import { Heading, Text } from './Text';
import { flattenConnection } from '@/lib/flattenConnection';
import { Order } from '@/lib/shopify/types';
import { Link } from './Link';
import Image from 'next/image';

export function OrderCard({ order }: { order: Order }) {
	if (!order?.id) return null;
	const { id: legacyOrderId, key } = getIdFromURL(order.id);
	const lineItems = flattenConnection(order?.lineItems);

	return (
		<li className="grid text-center border rounded">
			<Link
				href={`/account/orders/${legacyOrderId}?${key}`}
				className="grid items-center gap-4 p-4 md:gap-6 md:p-6 md:grid-cols-2"
				prefetch={true}
			>
				{lineItems[0].variant?.image && (
					<div className="card-image aspect-square bg-primary/5">
						<Image
							width={168}
							height={168}
							className="w-full fadeIn cover"
							alt={lineItems[0].variant?.image?.altText ?? 'Order image'}
							src={lineItems[0].variant?.image.url}
						/>
					</div>
				)}
				<div
					className={`flex-col justify-center text-left ${
						!lineItems[0].variant?.image && 'md:col-span-2'
					}`}
				>
					<Heading as="h3" format size="copy">
						{lineItems.length > 1
							? `${lineItems[0].title} +${lineItems.length - 1} more`
							: lineItems[0].title}
					</Heading>
					<dl className="grid grid-gap-1">
						<dt className="sr-only">Order ID</dt>
						<dd>
							<Text size="fine" color="subtle">
								Order No. {order.orderNumber}
							</Text>
						</dd>
						<dt className="sr-only">Order Date</dt>
						<dd>
							<Text size="fine" color="subtle">
								{new Date(order.processedAt).toDateString()}
							</Text>
						</dd>
						<dt className="sr-only">Fulfillment Status</dt>
						<dd className="mt-2">
							<span
								className={`px-3 py-1 text-xs font-medium rounded-full ${
									order.fulfillmentStatus === 'FULFILLED'
										? 'bg-green-100 text-green-800'
										: 'bg-primary/5 text-primary/50'
								}`}
							>
								<Text size="fine">
									{statusMessage(order.fulfillmentStatus)}
								</Text>
							</span>
						</dd>
					</dl>
				</div>
			</Link>
			<div className="self-end border-t">
				<Link
					href={`/account/orders/${legacyOrderId}?${key}`}
					className="block w-full p-2 text-center"
					prefetch={true}
				>
					<Text color="subtle" className="ml-3">
						View Details
					</Text>
				</Link>
			</div>
		</li>
	);
}
