import { ComponentMeta, Story } from '@storybook/react';
import { rest } from 'msw';
import { FetchExample } from './FetchExample';
import { Loader } from './../Loader';

export default {
  title: 'Example/Fetch Example',
  component: FetchExample,
} as ComponentMeta<typeof FetchExample>;

const Template: Story = () => <FetchExample />;

export const LoadingGreeting = Template.bind({});
LoadingGreeting.parameters = {
  msw: {
    handlers: [
      rest.get(`https://api.starter.dev/hello`, (req, res, ctx) => {
        return res(ctx.text('Loading...'));
      }),
    ],
  },
};

export const MessageWithGreeting = Template.bind({});
MessageWithGreeting.parameters = {
  msw: {
    handlers: [
      rest.get('https://api.starter.dev/hello', (req, res, ctx) => {
        req.url.searchParams.set('greeting', 'cra-rxjs-styled-components kit!');
        return res(ctx.text(`Hello, ${req.url.searchParams.get('greeting')}`));
      }),
    ],
  },
};
