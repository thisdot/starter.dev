import { Order } from '@/lib/shopify/types';
import { OrderCard } from './OrderCard';

export default function Orders({ orders }: { orders: Order[] }) {
	return (
		<ul className="grid grid-flow-row grid-cols-1 gap-2 gap-y-6 md:gap-4 lg:gap-6 false sm:grid-cols-3">
			{orders.map(order => (
				<OrderCard order={order} key={order.id} />
			))}
		</ul>
	);
}
