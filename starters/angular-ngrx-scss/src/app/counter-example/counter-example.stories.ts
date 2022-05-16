// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CounterExampleComponent } from './counter-example.component';
import { moduleMetadata } from '@storybook/angular';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../state/reducers';
import ButtonComponent from './counter-button/button.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { APP_BASE_HREF } from '@angular/common';

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
      declarations: [ButtonComponent],
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
