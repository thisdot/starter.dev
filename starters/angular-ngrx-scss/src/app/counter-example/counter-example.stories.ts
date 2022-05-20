// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CounterExampleComponent } from './counter-example.component';
import { StarterButtonComponent } from './starter-button/starter-button.component';
import { StoreModule } from '@ngrx/store';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { reducers, metaReducers } from '../state/reducers';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
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
      imports: [BrowserModule, AppRoutingModule, StoreModule.forRoot(reducers, { metaReducers })],
    }),
  ],
  parameters: {
    controls: {
      exclude: ['count$'],
    },
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<CounterExampleComponent> = (args: CounterExampleComponent) => ({
  props: args,
});

export const Page = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Page.args = {};
