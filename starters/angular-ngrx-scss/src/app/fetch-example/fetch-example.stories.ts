import { Store, StoreModule } from '@ngrx/store';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { of } from 'rxjs';
import { greetingReducer } from '../state/greeting/greeting.reducer';
import { FetchExampleComponent } from './fetch-example.component';
import { LoaderComponent } from './loader/loader.component';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<FetchExampleComponent> = {
  title: 'Example/Fetch Example',
  component: FetchExampleComponent,
  decorators: [
    moduleMetadata({
      declarations: [FetchExampleComponent, LoaderComponent],
      providers: [Store],
    }),
    applicationConfig({
      providers: [importProvidersFrom(StoreModule.forRoot({ greeting: greetingReducer }))],
    }),
  ],
};
export default meta;

type Story = StoryObj<FetchExampleComponent>;

export const LoadingGreeting: Story = {
  args: {
    isLoading$: of(true),
    greeting$: of(''),
    error$: of(''),
  },
};

export const MessageWithGreeting: Story = {
  args: {
    isLoading$: of(false),
    greeting$: of('Hello, angular-ngrx-scss starter.dev!'),
    error$: of(''),
  },
};

export const MessageNoGreetings: Story = {
  args: {
    isLoading$: of(false),
    greeting$: of('Hello, there'),
    error$: of(''),
  },
};
