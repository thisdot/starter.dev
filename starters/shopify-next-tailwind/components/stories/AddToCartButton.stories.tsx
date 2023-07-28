import { StoryFn, Meta } from '@storybook/react';
import { CartLineInput } from '@/lib/shopify/types';
import { AddToCartButton } from '../AddToCartButton';
import { Money } from '../MoneyComponent';
import { Text } from '../Text';

export default {
	title: 'Components/AddToCartButton',
	component: AddToCartButton,
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'inline'],
		},
		analytics: {
			control: 'select',
		},
	},
} as Meta;

const Template: StoryFn<{
	variant?: 'primary' | 'secondary' | 'inline';
	lines: CartLineInput[];
}> = args => (
	<div
		style={{
			maxWidth: '600px',
		}}
	>
		<AddToCartButton {...args}>
			<Text as="span" className="flex items-center justify-center gap-2">
				<span>Add to Bag</span> <span>·</span>{' '}
				<Money
					withoutTrailingZeros
					data={{ amount: '100', currencyCode: 'USD' }}
					as="span"
				/>
				<Money
					withoutTrailingZeros
					data={{ amount: '200', currencyCode: 'USD' }}
					as="span"
					className="opacity-50 strike"
				/>
			</Text>
		</AddToCartButton>
	</div>
);

export const Default = Template.bind({});
Default.args = {
	variant: 'primary',
	lines: [{ merchandiseId: 'idtest' }],
};

const QuickAdd: StoryFn<{
	variant?: 'primary' | 'secondary' | 'inline';
	lines: CartLineInput[];
}> = args => (
	<div
		style={{
			maxWidth: '600px',
		}}
	>
		<AddToCartButton {...args}>
			<Text as="span" className="flex items-center justify-center gap-2">
				Add to Bag
			</Text>
		</AddToCartButton>
	</div>
);

export const QuickAddButton = QuickAdd.bind({});
QuickAddButton.args = {
	variant: 'secondary',
	lines: [{ merchandiseId: 'idtest' }],
};
