import { Meta, StoryFn } from '@storybook/react';
import NumericIput from '../NumericInput';

export default {
	title: 'Components/Numericinput',
	component: NumericIput,
} as Meta;

const Template: StoryFn = () => (
	<div className="w-32">
		<NumericIput line={{ id: 'sjhashj', quantity: 1 }} onClick={() => null} />
	</div>
);

export const Default = Template.bind({});
