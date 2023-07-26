import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useProductOption = () => {
	const search = useSearchParams();

	const searchParamExists = useCallback(
		(name: string) => {
			const hasSearch = search.get(name);
			return hasSearch;
		},
		[search]
	);

	const isChecked = (name: string, value: string) => {
		const checked = searchParamExists(name) === value;
		return checked;
	};

	const searchDefaultOption = (
		name: string,
		value: string,
		firstValue: string
	) => {
		return !searchParamExists(name) && value === firstValue;
	};

	return { isChecked, searchDefaultOption, searchParamExists };
};

export default useProductOption;
