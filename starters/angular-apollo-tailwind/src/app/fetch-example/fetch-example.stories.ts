import { Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';

import { FetchExampleComponent } from './fetch-example.component';
import { createApollo } from '../graphql.module';
import { HttpLink } from 'apollo-angular/http';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'Example/Fetch Example',
  component: FetchExampleComponent,
  decorators: [
    moduleMetadata({
      declarations: [FetchExampleComponent],
      imports: [ApolloModule],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(ApolloModule),
        importProvidersFrom(HttpClientModule),
        {
          provide: APOLLO_OPTIONS,
          useFactory: createApollo,
          deps: [HttpLink],
        },
      ],
    }),
  ],
} as Meta;

const Template = (args: FetchExampleComponent) => ({
  props: args,
});

export const FetchExample = Template.bind({});
