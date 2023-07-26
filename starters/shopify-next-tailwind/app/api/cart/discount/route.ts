import { isShopifyError } from '@/lib/type-guards';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { applyDiscountToCart } from '@/lib/shopify';
import { formatErrorMessage } from '@/lib/utils';

export async function PUT(req: NextRequest): Promise<Response> {
	const cartId = cookies().get('cartId')?.value;
	const { discountCodes } = await req.json();

	if (!cartId) {
		return NextResponse.json(
			{ error: 'Missing cartId, or discountCodes' },
			{ status: 400 }
		);
	}

	try {
		const cart = await applyDiscountToCart({ cartId, discountCodes });
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
