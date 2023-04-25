import { html, TemplateResult } from 'lit';
import '../src/components/starter-app.js';

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
  title,
  backgroundColor = 'white',
}: ArgTypes) => html`
  <starter-app
    style="--starter-app-background-color: ${backgroundColor}"
    .title=${title}
  ></starter-app>
`;

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
