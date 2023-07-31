// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { APP_BASE_HREF } from '@angular/common';
import { CounterExampleComponent } from './counter-example.component';
import { StarterButtonComponent } from './starter-button/starter-button.component';
import type { Meta, StoryObj } from '@storybook/angular';

import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../state/reducers';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
const meta: Meta<CounterExampleComponent> = {
  title: 'Example/Counter Example Page',
  component: CounterExampleComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {},
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
      ],
      declarations: [StarterButtonComponent],
    }),
    applicationConfig({
      providers: [importProvidersFrom(StoreModule.forRoot(reducers, { metaReducers }))],
    }),
  ],
  parameters: {
    controls: {
      exclude: ['count$'],
    },
  },
};

export default meta;

type Story = StoryObj<CounterExampleComponent>;

export const Page: Story = { args: {} };
