import { CartLine } from '@/lib/shopify/types';
import useCartStore from '@/store/cart-store';

const useCartFetcher = () => {
	const addCatItem = async ({ variantId }: { variantId: string }) => {
		const response = await fetch(`/api/cart`, {
			method: 'POST',
			body: JSON.stringify({
				merchandiseId: variantId,
			}),
		});

		if (response.status === 200) {
			const data = await response.json();
			useCartStore.setState({ cart: data.cart });
		}
	};

	const editCartItem = async ({
		action,
		item,
	}: {
		action: 'plus' | 'minus';
		item: CartLine;
	}) => {
		const response = await fetch(`/api/cart`, {
			method: action === 'minus' && item.quantity - 1 === 0 ? 'DELETE' : 'PUT',
			body: JSON.stringify({
				lineId: item.id,
				variantId: item.merchandise.id,
				quantity: action === 'plus' ? item.quantity + 1 : item.quantity - 1,
			}),
		});

		if (response.status === 200) {
			const data = await response.json();
			useCartStore.setState({ cart: data.cart });
		}
	};

	const deleteCartItem = async ({ item }: { item: CartLine }) => {
		const response = await fetch(`/api/cart/delete`, {
			method: 'POST',
			body: JSON.stringify({
				lineIds: [item.id],
			}),
		});

		if (response.status === 200) {
			const data = await response.json();
			useCartStore.setState({ cart: data.cart });
		}
	};

	return { editCartItem, deleteCartItem, addCatItem };
};

export default useCartFetcher;
