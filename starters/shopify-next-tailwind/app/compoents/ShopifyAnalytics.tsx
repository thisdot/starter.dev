'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
	sendShopifyAnalytics,
	getClientBrowserParameters,
	AnalyticsEventName,
	useShopifyCookies,
} from '@shopify/hydrogen-react';
import { CurrencyCode } from '@/lib/useMoney';
import { LanguageCode } from '@shopify/hydrogen-react/storefront-api-types';

const ANALYTICS_CONFIG: {
	currency: CurrencyCode;
	acceptedLanguage: LanguageCode;
} = {
	currency: 'USD',
	acceptedLanguage: 'EN',
};

export function sendPageView(shopId: string) {
	sendShopifyAnalytics({
		eventName: AnalyticsEventName.PAGE_VIEW,
		payload: {
			...getClientBrowserParameters(),
			hasUserConsent: true,
			shopId: shopId,
			currency: ANALYTICS_CONFIG.currency,
			acceptedLanguage: ANALYTICS_CONFIG.acceptedLanguage,
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
