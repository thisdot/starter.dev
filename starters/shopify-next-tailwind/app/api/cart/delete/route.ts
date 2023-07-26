import { removeFromCart } from '@/lib/shopify';
import { isShopifyError } from '@/lib/type-guards';
import { formatErrorMessage } from '@/lib/utils';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<any> {
	const cartId = cookies().get('cartId')?.value;
	const { lineIds } = await req.json();

	if (!cartId || !lineIds) {
		return NextResponse.json(
			{ error: 'Missing cartId or lineId' },
			{ status: 400 }
		);
	}
	try {
		const cart = await removeFromCart(cartId, lineIds);
		return NextResponse.json({ status: 204, cart });
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
