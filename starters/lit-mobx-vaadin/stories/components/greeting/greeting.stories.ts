import { html } from 'lit';

import '../../../src/components/greeting/greeting.js';
import { Story } from '../../types.js';

export default {
	title: 'Greeting',
	component: 'td-greeting',
	argTypes: {
		message: {
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '' },
			},
			control: 'text',
		},
	},
};

interface ArgTypes {
	title?: string;
	message?: string;
}

const Template: Story<ArgTypes> = ({ message = 'Example Message' }) =>
	html`<td-greeting message="${message}"></td-greeting>`;

export const Greeting = Template.bind({});
Greeting.args = {};
