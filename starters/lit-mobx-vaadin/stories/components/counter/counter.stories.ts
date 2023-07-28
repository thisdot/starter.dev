import { html } from 'lit';

import '../../../src/components/counter/counter.js';
import { Story } from '../../types.js';

export default {
	title: 'Counter',
	component: 'td-counter',
	argTypes: {},
};

interface ArgTypes {
	title?: string;
}

const Template: Story<ArgTypes> = () => html`<td-counter></td-counter>`;

export const Counter = Template.bind({});
Counter.args = {};
