import { html, TemplateResult } from 'lit';

import '../../../src/components/fetch/fetch.js';

export default {
	title: 'Fetch',
	component: 'td-fetch',
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
	html`<td-fetch message="${message}"></td-fetch>`;

export const Fetch = Template.bind({});
Fetch.args = {};
