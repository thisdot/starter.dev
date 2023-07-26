import type { Money } from '@/lib/shopify/types';

export type UseMoneyValue = {
	/**
	 * The currency code from the `MoneyV2` object.
	 */
	currencyCode: CurrencyCode;
	/**
	 * The name for the currency code, returned by `Intl.NumberFormat`.
	 */
	currencyName?: string;
	/**
	 * The currency symbol returned by `Intl.NumberFormat`.
	 */
	currencySymbol?: string;
	/**
	 * The currency narrow symbol returned by `Intl.NumberFormat`.
	 */
	currencyNarrowSymbol?: string;
	/**
	 * The localized amount, without any currency symbols or non-number types from the `Intl.NumberFormat.formatToParts` parts.
	 */
	amount: string;
	/**
	 * All parts returned by `Intl.NumberFormat.formatToParts`.
	 */
	parts: Intl.NumberFormatPart[];
	/**
	 * A string returned by `new Intl.NumberFormat` for the amount and currency code,
	 * using the `locale` value in the [`LocalizationProvider` component](https://shopify.dev/api/hydrogen/components/localization/localizationprovider).
	 */
	localizedString: string;
	/**
	 * The `MoneyV2` object provided as an argument to the hook.
	 */
	original: Money;
	/**
	 * A string with trailing zeros removed from the fractional part, if any exist. If there are no trailing zeros, then the fractional part remains.
	 * For example, `$640.00` turns into `$640`.
	 * `$640.42` remains `$640.42`.
	 */
	withoutTrailingZeros: string;
	/**
	 * A string without currency and without trailing zeros removed from the fractional part, if any exist. If there are no trailing zeros, then the fractional part remains.
	 * For example, `$640.00` turns into `640`.
	 * `$640.42` turns into `640.42`.
	 */
	withoutTrailingZerosAndCurrency: string;
};
/**
 * The `useMoney` hook takes a [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) and returns a
 * default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by
 * [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
 * Uses `locale` from `ShopifyProvider`
 */

export function useMoney(money: Money, locale: string): UseMoneyValue {
	const { amount, currencyCode } = money;
	const formatter = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: currencyCode as CurrencyCode,
	});

	const parts = formatter.formatToParts(parseInt(amount));
	const currencySymbol = parts.find(part => part.type === 'currency')?.value;
	const currencyName = currencyCode;
	const currencyNarrowSymbol = currencySymbol;
	const localizedString = formatter.format(parseInt(amount));

	const amountString = parts
		.filter(part => part.type === 'integer' || part.type === 'fraction')
		.map(part => part.value)
		.join('');

	const withoutTrailingZeros = amountString.replace(/\.00$/, '');
	const withoutTrailingZerosAndCurrency =
		(currencySymbol &&
			withoutTrailingZeros.replace(currencySymbol, '').trim()) ||
		'';

	return {
		currencyCode: currencyCode as CurrencyCode,
		currencyName,
		currencySymbol,
		currencyNarrowSymbol,
		amount: amountString,
		parts,
		localizedString,
		original: money,
		withoutTrailingZeros,
		withoutTrailingZerosAndCurrency,
	};
}

export type CurrencyCode =
	/** United Arab Emirates Dirham (AED). */
	| 'AED'
	/** Afghan Afghani (AFN). */
	| 'AFN'
	/** Albanian Lek (ALL). */
	| 'ALL'
	/** Armenian Dram (AMD). */
	| 'AMD'
	/** Netherlands Antillean Guilder. */
	| 'ANG'
	/** Angolan Kwanza (AOA). */
	| 'AOA'
	/** Argentine Pesos (ARS). */
	| 'ARS'
	/** Australian Dollars (AUD). */
	| 'AUD'
	/** Aruban Florin (AWG). */
	| 'AWG'
	/** Azerbaijani Manat (AZN). */
	| 'AZN'
	/** Bosnia and Herzegovina Convertible Mark (BAM). */
	| 'BAM'
	/** Barbadian Dollar (BBD). */
	| 'BBD'
	/** Bangladesh Taka (BDT). */
	| 'BDT'
	/** Bulgarian Lev (BGN). */
	| 'BGN'
	/** Bahraini Dinar (BHD). */
	| 'BHD'
	/** Burundian Franc (BIF). */
	| 'BIF'
	/** Bermudian Dollar (BMD). */
	| 'BMD'
	/** Brunei Dollar (BND). */
	| 'BND'
	/** Bolivian Boliviano (BOB). */
	| 'BOB'
	/** Brazilian Real (BRL). */
	| 'BRL'
	/** Bahamian Dollar (BSD). */
	| 'BSD'
	/** Bhutanese Ngultrum (BTN). */
	| 'BTN'
	/** Botswana Pula (BWP). */
	| 'BWP'
	/** Belarusian Ruble (BYN). */
	| 'BYN'
	/** Belarusian Ruble (BYR). */
	| 'BYR'
	/** Belize Dollar (BZD). */
	| 'BZD'
	/** Canadian Dollars (CAD). */
	| 'CAD'
	/** Congolese franc (CDF). */
	| 'CDF'
	/** Swiss Francs (CHF). */
	| 'CHF'
	/** Chilean Peso (CLP). */
	| 'CLP'
	/** Chinese Yuan Renminbi (CNY). */
	| 'CNY'
	/** Colombian Peso (COP). */
	| 'COP'
	/** Costa Rican Colones (CRC). */
	| 'CRC'
	/** Cape Verdean escudo (CVE). */
	| 'CVE'
	/** Czech Koruny (CZK). */
	| 'CZK'
	/** Djiboutian Franc (DJF). */
	| 'DJF'
	/** Danish Kroner (DKK). */
	| 'DKK'
	/** Dominican Peso (DOP). */
	| 'DOP'
	/** Algerian Dinar (DZD). */
	| 'DZD'
	/** Egyptian Pound (EGP). */
	| 'EGP'
	/** Eritrean Nakfa (ERN). */
	| 'ERN'
	/** Ethiopian Birr (ETB). */
	| 'ETB'
	/** Euro (EUR). */
	| 'EUR'
	/** Fijian Dollars (FJD). */
	| 'FJD'
	/** Falkland Islands Pounds (FKP). */
	| 'FKP'
	/** United Kingdom Pounds (GBP). */
	| 'GBP'
	/** Georgian Lari (GEL). */
	| 'GEL'
	/** Ghanaian Cedi (GHS). */
	| 'GHS'
	/** Gibraltar Pounds (GIP). */
	| 'GIP'
	/** Gambian Dalasi (GMD). */
	| 'GMD'
	/** Guinean Franc (GNF). */
	| 'GNF'
	/** Guatemalan Quetzal (GTQ). */
	| 'GTQ'
	/** Guyanese Dollar (GYD). */
	| 'GYD'
	/** Hong Kong Dollars (HKD). */
	| 'HKD'
	/** Honduran Lempira (HNL). */
	| 'HNL'
	/** Croatian Kuna (HRK). */
	| 'HRK'
	/** Haitian Gourde (HTG). */
	| 'HTG'
	/** Hungarian Forint (HUF). */
	| 'HUF'
	/** Indonesian Rupiah (IDR). */
	| 'IDR'
	/** Israeli New Shekel (NIS). */
	| 'ILS'
	/** Indian Rupees (INR). */
	| 'INR'
	/** Iraqi Dinar (IQD). */
	| 'IQD'
	/** Iranian Rial (IRR). */
	| 'IRR'
	/** Icelandic Kronur (ISK). */
	| 'ISK'
	/** Jersey Pound. */
	| 'JEP'
	/** Jamaican Dollars (JMD). */
	| 'JMD'
	/** Jordanian Dinar (JOD). */
	| 'JOD'
	/** Japanese Yen (JPY). */
	| 'JPY'
	/** Kenyan Shilling (KES). */
	| 'KES'
	/** Kyrgyzstani Som (KGS). */
	| 'KGS'
	/** Cambodian Riel. */
	| 'KHR'
	/** Kiribati Dollar (KID). */
	| 'KID'
	/** Comorian Franc (KMF). */
	| 'KMF'
	/** South Korean Won (KRW). */
	| 'KRW'
	/** Kuwaiti Dinar (KWD). */
	| 'KWD'
	/** Cayman Dollars (KYD). */
	| 'KYD'
	/** Kazakhstani Tenge (KZT). */
	| 'KZT'
	/** Laotian Kip (LAK). */
	| 'LAK'
	/** Lebanese Pounds (LBP). */
	| 'LBP'
	/** Sri Lankan Rupees (LKR). */
	| 'LKR'
	/** Liberian Dollar (LRD). */
	| 'LRD'
	/** Lesotho Loti (LSL). */
	| 'LSL'
	/** Lithuanian Litai (LTL). */
	| 'LTL'
	/** Latvian Lati (LVL). */
	| 'LVL'
	/** Libyan Dinar (LYD). */
	| 'LYD'
	/** Moroccan Dirham. */
	| 'MAD'
	/** Moldovan Leu (MDL). */
	| 'MDL'
	/** Malagasy Ariary (MGA). */
	| 'MGA'
	/** Macedonia Denar (MKD). */
	| 'MKD'
	/** Burmese Kyat (MMK). */
	| 'MMK'
	/** Mongolian Tugrik. */
	| 'MNT'
	/** Macanese Pataca (MOP). */
	| 'MOP'
	/** Mauritanian Ouguiya (MRU). */
	| 'MRU'
	/** Mauritian Rupee (MUR). */
	| 'MUR'
	/** Maldivian Rufiyaa (MVR). */
	| 'MVR'
	/** Malawian Kwacha (MWK). */
	| 'MWK'
	/** Mexican Pesos (MXN). */
	| 'MXN'
	/** Malaysian Ringgits (MYR). */
	| 'MYR'
	/** Mozambican Metical. */
	| 'MZN'
	/** Namibian Dollar. */
	| 'NAD'
	/** Nigerian Naira (NGN). */
	| 'NGN'
	/** Nicaraguan Córdoba (NIO). */
	| 'NIO'
	/** Norwegian Kroner (NOK). */
	| 'NOK'
	/** Nepalese Rupee (NPR). */
	| 'NPR'
	/** New Zealand Dollars (NZD). */
	| 'NZD'
	/** Omani Rial (OMR). */
	| 'OMR'
	/** Panamian Balboa (PAB). */
	| 'PAB'
	/** Peruvian Nuevo Sol (PEN). */
	| 'PEN'
	/** Papua New Guinean Kina (PGK). */
	| 'PGK'
	/** Philippine Peso (PHP). */
	| 'PHP'
	/** Pakistani Rupee (PKR). */
	| 'PKR'
	/** Polish Zlotych (PLN). */
	| 'PLN'
	/** Paraguayan Guarani (PYG). */
	| 'PYG'
	/** Qatari Rial (QAR). */
	| 'QAR'
	/** Romanian Lei (RON). */
	| 'RON'
	/** Serbian dinar (RSD). */
	| 'RSD'
	/** Russian Rubles (RUB). */
	| 'RUB'
	/** Rwandan Franc (RWF). */
	| 'RWF'
	/** Saudi Riyal (SAR). */
	| 'SAR'
	/** Solomon Islands Dollar (SBD). */
	| 'SBD'
	/** Seychellois Rupee (SCR). */
	| 'SCR'
	/** Sudanese Pound (SDG). */
	| 'SDG'
	/** Swedish Kronor (SEK). */
	| 'SEK'
	/** Singapore Dollars (SGD). */
	| 'SGD'
	/** Saint Helena Pounds (SHP). */
	| 'SHP'
	/** Sierra Leonean Leone (SLL). */
	| 'SLL'
	/** Somali Shilling (SOS). */
	| 'SOS'
	/** Surinamese Dollar (SRD). */
	| 'SRD'
	/** South Sudanese Pound (SSP). */
	| 'SSP'
	/** Sao Tome And Principe Dobra (STD). */
	| 'STD'
	/** Sao Tome And Principe Dobra (STN). */
	| 'STN'
	/** Syrian Pound (SYP). */
	| 'SYP'
	/** Swazi Lilangeni (SZL). */
	| 'SZL'
	/** Thai baht (THB). */
	| 'THB'
	/** Tajikistani Somoni (TJS). */
	| 'TJS'
	/** Turkmenistani Manat (TMT). */
	| 'TMT'
	/** Tunisian Dinar (TND). */
	| 'TND'
	/** Tongan Pa'anga (TOP). */
	| 'TOP'
	/** Turkish Lira (TRY). */
	| 'TRY'
	/** Trinidad and Tobago Dollars (TTD). */
	| 'TTD'
	/** Taiwan Dollars (TWD). */
	| 'TWD'
	/** Tanzanian Shilling (TZS). */
	| 'TZS'
	/** Ukrainian Hryvnia (UAH). */
	| 'UAH'
	/** Ugandan Shilling (UGX). */
	| 'UGX'
	/** United States Dollars (USD). */
	| 'USD'
	/** Uruguayan Pesos (UYU). */
	| 'UYU'
	/** Uzbekistan som (UZS). */
	| 'UZS'
	/** Venezuelan Bolivares (VED). */
	| 'VED'
	/** Venezuelan Bolivares (VEF). */
	| 'VEF'
	/** Venezuelan Bolivares (VES). */
	| 'VES'
	/** Vietnamese đồng (VND). */
	| 'VND'
	/** Vanuatu Vatu (VUV). */
	| 'VUV'
	/** Samoan Tala (WST). */
	| 'WST'
	/** Central African CFA Franc (XAF). */
	| 'XAF'
	/** East Caribbean Dollar (XCD). */
	| 'XCD'
	/** West African CFA franc (XOF). */
	| 'XOF'
	/** CFP Franc (XPF). */
	| 'XPF'
	/** Unrecognized currency. */
	| 'XXX'
	/** Yemeni Rial (YER). */
	| 'YER'
	/** South African Rand (ZAR). */
	| 'ZAR'
	/** Zambian Kwacha (ZMW). */
	| 'ZMW';
