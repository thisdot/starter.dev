import { Store, StoreModule } from '@ngrx/store';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { of } from 'rxjs';
import { greetingReducer } from '../state/greeting/greeting.reducer';
import { FetchExampleComponent } from './fetch-example.component';
export default {
  title: 'Example/Fetch Example',
  component: FetchExampleComponent,
  decorators: [
    moduleMetadata({
      imports: [StoreModule.forRoot(greetingReducer)],
      declarations: [FetchExampleComponent],
      providers: [Store],
    }),
  ],
} as Meta;

const Template: Story<FetchExampleComponent> = (args: FetchExampleComponent) => ({
  props: {
    ...args,
  },
});

export const LoadingGreeting = Template.bind({});
LoadingGreeting.args = {
  isLoading$: of(true),
  greeting$: of(''),
  error$: of(''),
};

export const MessageWithGreeting = Template.bind({});
MessageWithGreeting.args = {
  isLoading$: of(false),
  greeting$: of('Hello, angular-ngrx-scss starter.dev!'),
  error$: of(''),
};

export const MessageNoGreeting = Template.bind({});
MessageNoGreeting.args = {
  isLoading$: of(false),
  greeting$: of('Hello, there'),
  error$: of(''),
};
