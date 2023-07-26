import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { Heading } from '@/components/Text';
import { IconClose } from '@/components/Icon';
import clsx from 'clsx';

/**
 * Drawer component that opens on user click.
 * @param heading - string. Shown at the top of the drawer.
 * @param open - boolean state. if true opens the drawer.
 * @param onClose - function should set the open state.
 * @param openFrom - right, left
 * @param children - react children node.
 */
export function Drawer({
	heading,
	open,
	onClose,
	openFrom = 'right',
	children,
}: {
	heading?: string;
	open: boolean;
	onClose: () => void;
	openFrom: 'right' | 'left';
	children: React.ReactNode;
}) {
	const offScreen = {
		right: 'translate-x-full',
		left: '-translate-x-full',
	};

	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 left-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0">
					<div className="absolute inset-0 overflow-hidden">
						<div
							className={clsx('fixed inset-y-0 flex max-w-full', {
								'right-0': openFrom === 'right',
							})}
						>
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-300"
								enterFrom={offScreen[openFrom]}
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-300"
								leaveFrom="translate-x-0"
								leaveTo={offScreen[openFrom]}
							>
								<Dialog.Panel className="w-screen max-w-lg text-left align-middle transition-all transform shadow-xl h-screen-dynamic bg-contrast">
									<header
										className={clsx(
											'sticky top-0 flex items-center px-6 h-nav sm:px-8 md:px-12',
											{
												'justify-between': heading,
												'justify-end': !heading,
											}
										)}
									>
										{heading !== null && (
											<Dialog.Title>
												<Heading as="span" size="lead" id="cart-contents">
													{heading}
												</Heading>
											</Dialog.Title>
										)}
										<button
											type="button"
											className="p-4 -m-4 transition text-primary hover:text-primary/50"
											onClick={onClose}
											data-test="close-cart"
										>
											<IconClose aria-label="Close panel" />
										</button>
									</header>
									{children}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

/* Use for associating arialabelledby with the title*/
Drawer.Title = Dialog.Title;
