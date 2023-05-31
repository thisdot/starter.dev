import { html, TemplateResult } from 'lit';

import '../../../src/components/greeting/greeting.js';

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

interface Story<T> {
	(args: T): TemplateResult;
	args?: Partial<T>;
	argTypes?: Record<string, unknown>;
}

interface ArgTypes {
	title?: string;
	message?: string;
}

const Template: Story<ArgTypes> = ({ message = 'Example Message' }) =>
	html`<td-greeting message="${message}"></td-greeting>`;

export const Greeting = Template.bind({});
Greeting.args = {};
