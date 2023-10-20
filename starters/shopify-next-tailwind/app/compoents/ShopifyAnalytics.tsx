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

export function sendPageView(
	shopId: string,
	currency: CurrencyCode,
	acceptedLanguage: LanguageCode
) {
	sendShopifyAnalytics({
		eventName: AnalyticsEventName.PAGE_VIEW,
		payload: {
			...getClientBrowserParameters(),
			hasUserConsent: true,
			shopId: shopId,
			currency: currency,
			acceptedLanguage: acceptedLanguage,
		},
	});
}

function ShopifyAnalytics({
	shopId,
	currency,
	acceptedLanguage,
}: {
	shopId: string;
	currency: CurrencyCode;
	acceptedLanguage: LanguageCode;
}) {
	const pathname = usePathname();

	useEffect(() => {
		sendPageView(shopId, currency, acceptedLanguage);
	}, [pathname]);

	useShopifyCookies();

	return <></>;
}

export default ShopifyAnalytics;
