import { html, TemplateResult } from 'lit';

import '../../../src/components/error/error.js';

export default {
	title: 'Error',
	component: 'td-error',
	argTypes: {
		message: {
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '' },
			},
			control: 'text',
		}
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

const Template: Story<ArgTypes> = ({ message = 'Example Error Message' }) =>
	html`<td-error message="${message}"></td-error>`;

export const Error = Template.bind({});
Error.args = {};
