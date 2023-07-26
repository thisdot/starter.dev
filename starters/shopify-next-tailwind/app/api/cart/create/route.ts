import { createCart, getCart } from '@/lib/shopify';
import { Cart } from '@/lib/shopify/types';
import { isShopifyError } from '@/lib/type-guards';
import { formatErrorMessage } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<Response> {
	const cartIdCookie = req.cookies.get('cartId');

	if (cartIdCookie) {
		try {
			const cart = await getCart(cartIdCookie.value);
			return NextResponse.json({ status: 200, cart });
		} catch (e) {
			if (isShopifyError(e)) {
				return NextResponse.json(
					{ message: formatErrorMessage(e.message) },
					{ status: e.status }
				);
			}

			return NextResponse.json({ status: 500 });
		}
	} else {
		try {
			const cart: Cart = await createCart();

			const response = NextResponse.json({ ...cart }, { status: 200 });

			response.cookies.set({
				name: 'cartId',
				value: cart.id,
				httpOnly: true,
				path: '/',
				expires: new Date(Date.now() + 20 * 60 * 1000 + 5 * 1000),
			});

			return response;
		} catch (e) {
			if (isShopifyError(e)) {
				return NextResponse.json(
					{ message: formatErrorMessage(e.message) },
					{ status: e.status }
				);
			}

			return NextResponse.json({ status: 500 });
		}
	}
}
