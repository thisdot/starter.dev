import { type ReactNode } from 'react';
import type { Money } from '@/lib/shopify/types';
import type { PartialDeep } from 'type-fest';
import { useMoney } from '@/lib/useMoney';
export interface MoneyPropsBase<ComponentGeneric extends React.ElementType> {
	/** An HTML tag or React Component to be rendered as the base element wrapper. The default is `div`. */
	as?: ComponentGeneric;
	/** An object with fields that correspond to the Storefront API's [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2). */
	data: PartialDeep<
		Money,
		{
			recurseIntoArrays: true;
		}
	> &
		Money;
	/** Whether to remove the currency symbol from the output. */
	withoutCurrency?: boolean;
	/** Whether to remove trailing zeros (fractional money) from the output. */
	withoutTrailingZeros?: boolean;
	/** A [UnitPriceMeasurement object](https://shopify.dev/api/storefront/2023-04/objects/unitpricemeasurement). */
	measurement?: PartialDeep<
		UnitPriceMeasurement,
		{
			recurseIntoArrays: true;
		}
	>;
	/** Customizes the separator between the money output and the measurement output. Used with the `measurement` prop. Defaults to `'/'`. */
	measurementSeparator?: ReactNode;
}
export type MoneyProps<ComponentGeneric extends React.ElementType> =
	MoneyPropsBase<ComponentGeneric> &
		Omit<
			React.ComponentPropsWithoutRef<ComponentGeneric>,
			keyof MoneyPropsBase<ComponentGeneric>
		>;
/**
 * The `Money` component renders a string of the Storefront API's
 * [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) according to the
 * `locale` in the `ShopifyProvider` component.
 */
// export declare function Money<ComponentGeneric extends React.ElementType = 'div'>({ data, as, withoutCurrency, withoutTrailingZeros, measurement, measurementSeparator, ...passthroughProps }: MoneyProps<ComponentGeneric>): JSX.Element;
export function Money<ComponentGeneric extends React.ElementType = 'div'>({
	data,
	as,
	withoutCurrency,
	withoutTrailingZeros,
	measurement,
	measurementSeparator,
	...passthroughProps
}: MoneyProps<ComponentGeneric>): JSX.Element {
	const { currencyNarrowSymbol } = useMoney(data, 'en');
	return (
		<div {...passthroughProps}>
			{currencyNarrowSymbol} {data.amount}
		</div>
	);
}

export type UnitPriceMeasurement = {
	__typename?: 'UnitPriceMeasurement';
	/** The type of unit of measurement for the unit price measurement. */
	measuredType?: UnitPriceMeasurementMeasuredType | null;
	/** The quantity unit for the unit price measurement. */
	quantityUnit?: UnitPriceMeasurementMeasuredUnit | null;
	/** The quantity value for the unit price measurement. */
	quantityValue: number;
	/** The reference unit for the unit price measurement. */
	referenceUnit?: UnitPriceMeasurementMeasuredUnit | null;
	/** The reference value for the unit price measurement. */
	referenceValue: number;
};

export type UnitPriceMeasurementMeasuredType =
	/** Unit of measurements representing areas. */
	| 'AREA'
	/** Unit of measurements representing lengths. */
	| 'LENGTH'
	/** Unit of measurements representing volumes. */
	| 'VOLUME'
	/** Unit of measurements representing weights. */
	| 'WEIGHT';

/** The valid units of measurement for a unit price measurement. */
export type UnitPriceMeasurementMeasuredUnit =
	/** 100 centiliters equals 1 liter. */
	| 'CL'
	/** 100 centimeters equals 1 meter. */
	| 'CM'
	/** Metric system unit of weight. */
	| 'G'
	/** 1 kilogram equals 1000 grams. */
	| 'KG'
	/** Metric system unit of volume. */
	| 'L'
	/** Metric system unit of length. */
	| 'M'
	/** Metric system unit of area. */
	| 'M2'
	/** 1 cubic meter equals 1000 liters. */
	| 'M3'
	/** 1000 milligrams equals 1 gram. */
	| 'MG'
	/** 1000 milliliters equals 1 liter. */
	| 'ML'
	/** 1000 millimeters equals 1 meter. */
	| 'MM';
