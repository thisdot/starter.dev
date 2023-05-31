import { html, TemplateResult } from 'lit';

import '../../../src/components/counter/counter.js';

export default {
	title: 'Counter',
	component: 'td-counter',
	argTypes: {},
};

interface Story<T> {
	(args: T): TemplateResult;
	args?: Partial<T>;
	argTypes?: Record<string, unknown>;
}

interface ArgTypes {
	title?: string;
}

const Template: Story<ArgTypes> = () => html`<td-counter></td-counter>`;

export const Counter = Template.bind({});
Counter.args = {};
