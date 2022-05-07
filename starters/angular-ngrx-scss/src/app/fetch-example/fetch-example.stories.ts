import { Store } from '@ngrx/store';
import { Story, Meta, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { of } from 'rxjs';
import { FetchExampleComponent } from './fetch-example.component';

export default {
  title: 'Fetch Example',
  component: FetchExampleComponent,
  decorators: [
    moduleMetadata({
      declarations: [FetchExampleComponent],
      providers: [Store],
    }),
    componentWrapperDecorator((story) => `<div style="margin: 3em">${story}</div>`),
  ],
} as Meta;

const Template: Story<FetchExampleComponent> = (args: FetchExampleComponent) => ({
  props: {
    ...args,
    greeting$: '',
    error$: '',
    isLoading$: false,
  },
});

export const Loading = Template.bind({});
Loading.args = {
  isLoading$: of(true),
};
