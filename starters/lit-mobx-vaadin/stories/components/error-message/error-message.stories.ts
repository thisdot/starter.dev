import { html, TemplateResult } from 'lit';

import '../../../src/components/error-message/error-message.js';

export default {
	title: 'Error message',
	component: 'td-error-message',
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

const Template: Story<ArgTypes> = ({ message = 'Example Error Message' }) =>
	html`<td-error-message message=${message}></td-error-message>`;

export const ErrorMessage = Template.bind({});
ErrorMessage.args = {};
