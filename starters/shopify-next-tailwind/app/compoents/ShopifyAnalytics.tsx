'use client';

import { useShopifyCookies } from '@shopify/hydrogen-react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
	sendShopifyAnalytics,
	getClientBrowserParameters,
	AnalyticsEventName,
} from '@shopify/hydrogen-react';

export function sendPageView(shopId: string) {
	sendShopifyAnalytics({
		eventName: AnalyticsEventName.PAGE_VIEW,
		payload: {
			...getClientBrowserParameters(),
			hasUserConsent: true,
			shopId: shopId,
			currency: 'USD',
			acceptedLanguage: 'EN',
		},
	});
}

function ShopifyAnalytics({ shopId }: { shopId: string }) {
	const pathname = usePathname();

	useEffect(() => {
		sendPageView(shopId);
	}, [pathname]);

	useShopifyCookies();

	return <></>;
}

export default ShopifyAnalytics;
