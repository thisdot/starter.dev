import { mount } from '@vue/test-utils';
import FetchMessage from '../../src/components/FetchMessage';

jest.mock('@vue/apollo-composable', () => {
  const data = {
    result: {
        value: {
          hello: 'Hello, vue3-apollo-quasar starter.dev!',
        },
      },
      loading: false,
  }
  return {
    useQuery: jest.fn(() => data)
  }
});

describe('FetchMessage', () => {
  const wrapper = mount(FetchMessage, {
      props: {
        message: 'vue3-apollo-quasar starter.dev!',
      },
    });

  const finalMessage = `Hello, ${wrapper.vm.message}`;

  it('Should Mount', () => {
    expect(wrapper.vm.message).toBeTruthy();
  });

  it('should fetch', () => {
    expect(wrapper.vm.msg).toBe(finalMessage);
   });


  it('should display message', () => {
    expect(wrapper.text()).toBe(`Message: ${finalMessage}`);
   });
  
  });
