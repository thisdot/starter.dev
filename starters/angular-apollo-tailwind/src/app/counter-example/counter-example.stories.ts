import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { ApolloModule } from 'apollo-angular';

import { CounterExampleComponent } from './counter-example.component';

export default {
  title: 'Example/Counter Example',
  component: CounterExampleComponent,
  decorators: [
    moduleMetadata({
      declarations: [CounterExampleComponent],
      imports: [ApolloModule],
    }),
  ],
} as Meta;

const Template: Story<CounterExampleComponent> = (
  args: CounterExampleComponent
) => ({
  props: args,
});

export const CounterExample = Template.bind({});
