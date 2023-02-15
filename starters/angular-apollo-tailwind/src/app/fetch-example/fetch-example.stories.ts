import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { ApolloModule } from 'apollo-angular';

import { FetchExampleComponent } from './fetch-example.component';

export default {
  title: 'Example/Fetch Example',
  component: FetchExampleComponent,
  decorators: [
    moduleMetadata({
      declarations: [FetchExampleComponent],
      imports: [ApolloModule],
    }),
  ],
} as Meta;

const Template: Story<FetchExampleComponent> = (
  args: FetchExampleComponent
) => ({
  props: args,
});

export const FetchExample = Template.bind({});
