'use client';

import clsx from 'clsx';
import ProductOptionLink from './ProductOptionLink';
import { Text } from './Text';
import useProductOption from '@/hooks/useProductOption';

interface IOption {
	name: string;
	values: string[];
}

const ItemTabHeading = (option: IOption) => {
	const { isChecked, searchDefaultOption } = useProductOption();

	return (
		<>
			{option.values.map((value, index) => {
				const checked = isChecked(option.name, value);
				const id = `option-${index}-${value}`;
				return (
					<Text key={id}>
						<ProductOptionLink
							optionName={option.name}
							optionValue={value}
							className={clsx(
								'leading-none py-1 border-b-[1.5px] cursor-pointer transition-all duration-200 border-primary/0',
								{
									'border-primary/50':
										checked ||
										searchDefaultOption(option.name, value, option.values[0]),
								}
							)}
						/>
					</Text>
				);
			})}
		</>
	);
};

export default ItemTabHeading;
