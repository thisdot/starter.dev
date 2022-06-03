import { mount } from '@vue/test-utils';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue';
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

  it('Should Mount', () => {
    expect(wrapper.vm.message).toBeTruthy();
  });

  it('should fecth and display', () => {
    const finalMessage = 'Hello, vue3-apollo-quasar starter.dev!';

    const VUE_APOLLO_QUASAR_GREETING = gql`
      query ($greeting: String!) {
        hello(greeting: $greeting)
      }
    `;

    const { result, loading } = useQuery(VUE_APOLLO_QUASAR_GREETING, {
      greeting: wrapper.vm.message,
    });

    const msg = computed(() => result.value ? result.value.hello : 'can not find greeting');
    expect(msg.value).toBe(finalMessage);
  });
});
