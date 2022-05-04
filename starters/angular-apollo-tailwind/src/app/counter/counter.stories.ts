import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { ApolloModule } from 'apollo-angular';

import { CounterComponent } from './counter.component';

export default {
    title: 'Example/Counter Example',
    component: CounterComponent,
    decorators: [
        moduleMetadata({
            declarations: [CounterComponent],
            imports: [ApolloModule],
        }),
    ],
} as Meta;

const Template: Story<CounterComponent> = (
    args: CounterComponent
) => ({
    props: args,
});

export const CounterExample = Template.bind({});
