import { mount } from '@vue/test-utils';
import { reactive } from 'vue';
import { FetchExample } from '../../src/components/FetchExample';

const data = reactive({
  result: {
    value: {
      hello: 'Hello, vue3-apollo-quasar starter.dev!',
    },
  },
  loading: false,
});

jest.mock('@vue/apollo-composable', () => {
  return {
    useQuery: jest.fn(() => data),
  };
});

describe('FetchMessage', () => {
  const wrapper = mount(FetchExample, {
    props: {
      message: 'vue3-apollo-quasar starter.dev!',
    },
  });

  it('Should Mount', () => {
    expect(wrapper.vm.message).toBeTruthy();
  });

  it('should fetch', () => {
    const finalMessage = `Hello, ${wrapper.vm.message}`;
    expect(wrapper.vm.msg).toBe(finalMessage);
  });

  it('should display message', async () => {
    const prop = 'vue3-apollo-quasar';
    data.result.value.hello = `Hello, ${prop}`;

    await wrapper.setProps({
      message: prop,
    });

    const finalMessage = `Hello, ${wrapper.vm.message}`;
    const p = await wrapper.find('p.message');

    expect(p.text()).toBe(`Message: ${finalMessage}`);
  });
});
