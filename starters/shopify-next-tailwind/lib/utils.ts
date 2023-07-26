// @ts-expect-error types not available
import typographicBase from 'typographic-base';
import { Money } from './shopify/types';

export function missingClass(string?: string, prefix?: string) {
	if (!string) {
		return true;
	}

	const regex = new RegExp(` ?${prefix}`, 'g');
	return regex.exec(string) === null;
}

export function formatText(input?: string | React.ReactNode) {
	if (!input) {
		return;
	}

	if (typeof input !== 'string') {
		return input;
	}

	return typographicBase(input, { locale: 'en-us' }).replace(
		/\s([^\s<]+)\s*$/g,
		'\u00A0$1'
	);
}

export function isNewArrival(date: string, daysOld = 30) {
	return (
		new Date(date).valueOf() >
		new Date().setDate(new Date().getDate() - daysOld).valueOf()
	);
}

export function isDiscounted(price: Money, compareAtPrice: Money) {
	if (compareAtPrice?.amount > price?.amount) {
		return true;
	}
	return false;
}

export const INPUT_STYLE_CLASSES =
	'appearance-none rounded dark:bg-transparent border focus:border-primary/50 focus:ring-0 w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline bg-transparent';

export const getInputStyleClasses = (isError?: string | null) => {
	return `${INPUT_STYLE_CLASSES} ${
		isError ? 'border-red-500' : 'border-primary/20'
	}`;
};

export function getExcerpt(text: string) {
	const regex = /<p.*>(.*?)<\/p>/;
	const match = regex.exec(text);
	return match?.length ? match[0] : text;
}

export function getIdFromURL(addressId: string): { id: string; key: string } {
	const [id, key] = addressId.split('/').pop()?.split('?') ?? ['', ''];

	return { id, key };
}

export function formatErrorMessage(err: Error): string {
	return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export function statusMessage(status: string) {
	const translations: Record<string, string> = {
		ATTEMPTED_DELIVERY: 'Attempted delivery',
		CANCELED: 'Canceled',
		CONFIRMED: 'Confirmed',
		DELIVERED: 'Delivered',
		FAILURE: 'Failure',
		FULFILLED: 'Fulfilled',
		IN_PROGRESS: 'In Progress',
		IN_TRANSIT: 'In transit',
		LABEL_PRINTED: 'Label printed',
		LABEL_PURCHASED: 'Label purchased',
		LABEL_VOIDED: 'Label voided',
		MARKED_AS_FULFILLED: 'Marked as fulfilled',
		NOT_DELIVERED: 'Not delivered',
		ON_HOLD: 'On Hold',
		OPEN: 'Open',
		OUT_FOR_DELIVERY: 'Out for delivery',
		PARTIALLY_FULFILLED: 'Partially Fulfilled',
		PENDING_FULFILLMENT: 'Pending',
		PICKED_UP: 'Displayed as Picked up',
		READY_FOR_PICKUP: 'Ready for pickup',
		RESTOCKED: 'Restocked',
		SCHEDULED: 'Scheduled',
		SUBMITTED: 'Submitted',
		UNFULFILLED: 'Unfulfilled',
	};
	try {
		return translations?.[status];
	} catch (error) {
		return status;
	}
}

export function convertObjectToQueryString(object: Record<string, any>) {
	return new URLSearchParams(object).toString();
}
