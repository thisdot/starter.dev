import { Router } from '@solidjs/router';
import { Greeting } from '.';

export default {
  title: 'Example/Fetch Example',
  component: Greeting,
  argTypes: {},
  parameters: {
    mockData: [
      {
        url: 'https://api.starter.dev/.netlify/functions/server/hello?greeting=',
        method: 'GET',
        status: 200,
        response: () => 'Hi storybook user,',
        delay: 1000,
      },
    ],
  },

};

const Template = (args) => (
  <Router>
    <Greeting {...args} />
  </Router>
);

export const FetchExample = Template.bind({});