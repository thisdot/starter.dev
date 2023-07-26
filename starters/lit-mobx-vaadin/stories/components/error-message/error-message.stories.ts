import { html } from 'lit';

import '../../../src/components/error-message/error-message.js';
import { Story } from '../../types.js';

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

interface ArgTypes {
	title?: string;
	message?: string;
}

const Template: Story<ArgTypes> = ({ message = 'Example Error Message' }) =>
	html`<td-error-message message=${message}></td-error-message>`;

export const ErrorMessage = Template.bind({});
ErrorMessage.args = {};
