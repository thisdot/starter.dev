import { html, TemplateResult } from 'lit';

import '../src/pages/starter-app.js';

export default {
  title: 'StarterApp',
  component: 'starter-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({
  backgroundColor = 'white',
}: ArgTypes) => html`
  <starter-app
    style="--starter-app-background-color: ${backgroundColor}"
  ></starter-app>
`;

export const App = Template.bind({});
App.args = {};
