'use client';

import { Listbox } from '@headlessui/react';
import { useRef } from 'react';

import clsx from 'clsx';
import { IconCaret, IconCheck } from '.';
import ProductOptionLink from './ProductOptionLink';
import useProductOption from '@/hooks/useProductOption';

interface IOption {
	name: string;
	values: string[];
}

function ProductListBox(option: IOption) {
	const closeRef = useRef<HTMLButtonElement>(null);
	const { isChecked, searchDefaultOption, searchParamExists } =
		useProductOption();

	return (
		<div className="relative w-full">
			<Listbox>
				{({ open }) => (
					<>
						<Listbox.Button
							ref={closeRef}
							className={clsx(
								'flex items-center justify-between w-full py-3 px-4 border border-primary rounded',
								{
									'rounded-b md:rounded-t md:rounded-b-none': open,
								}
							)}
						>
							<span>{searchParamExists(option.name) || option.values[0]}</span>
							<IconCaret direction={open ? 'up' : 'down'} />
						</Listbox.Button>
						<Listbox.Options
							className={clsx(
								'border-primary bg-contrast absolute bottom-12 z-30 grid h-48 w-full overflow-y-scroll rounded-t border px-2 py-2 transition-[max-height] duration-150 sm:bottom-auto md:rounded-b md:rounded-t-none md:border-t-0 md:border-b max-h-0',
								{ 'max-h-48': open }
							)}
						>
							{option.values.map((value, index) => {
								const checked = isChecked(option.name, value);
								const id = `option-${index}-${value}`;
								return (
									<Listbox.Option key={id} value={value}>
										{({ active }) => (
											<ProductOptionLink
												optionName={option.name}
												optionValue={value}
												className={clsx(
													'text-primary w-full p-2 transition rounded flex justify-start items-center text-left cursor-pointer',
													{ 'bg-primary/10': active }
												)}
												onClick={() => {
													if (!closeRef?.current) return;
													closeRef.current.click();
												}}
											>
												{value}
												{(checked ||
													searchDefaultOption(
														option.name,
														value,
														option.values[0]
													)) && (
													<span className="ml-2">
														<IconCheck />
													</span>
												)}
											</ProductOptionLink>
										)}
									</Listbox.Option>
								);
							})}
						</Listbox.Options>
					</>
				)}
			</Listbox>
		</div>
	);
}

export default ProductListBox;
