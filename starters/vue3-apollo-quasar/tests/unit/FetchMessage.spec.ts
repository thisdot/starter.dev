import { mount } from '@vue/test-utils';
import FetchMessage from '../../src/components/FetchMessage';

describe('FetchMessage', () => {
  const wrapper = mount(FetchMessage, {
    props: {
      message: 'vue3-apollo-quasar starter.dev!',
    },
  });
  it('Should Mount', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('should fect and display', async () => {
    const finalMessage = 'Message: Hello, vue3-apollo-quasar starter.dev!';
    const message = await wrapper.find('p[class=message]');
    console.log(message);

    // expect(message.text).toBe(finalMessage);
  });
});
