import { mount } from '@vue/test-utils';
import { computed } from 'vue';
import FetchMessage from '../../src/components/FetchMessage';

describe('FetchMessage', () => {
  let wrapper: any;

  beforeEach(() => {
    process.env = Object.assign(process.env, {
      VUE_APP_GITHUB_KEY: 'value',
    });

    wrapper = mount(FetchMessage, {
      props: {
        message: 'vue3-apollo-quasar starter.dev!',
      },
      setup() {
        //
      },
    });
  });

  it('Should Mount', async () => {
    expect(wrapper.vm.message).toBeTruthy();
  });

  it('should fect and display', async () => {
    const finalMessage = 'Hello, vue3-apollo-quasar starter.dev!';
    const gql = jest.fn().mockImplementation();
    const useQuery = jest.fn().mockReturnValue({
      result: {
        value: {
          hello: `Hello, ${wrapper.vm.message}`,
        },
      },
      loading: false,
    });

    const VUE_APOLLO_QUASAR_GREETING = gql`
      query ($greeting: String!) {
        hello(greeting: $greeting)
      }
    `;

    const { result, loading } = useQuery(VUE_APOLLO_QUASAR_GREETING, {
      greeting: wrapper.vm.message,
    });

    const msg = computed(() => result.value?.hello ?? 'can not find greeting');

    expect(msg.value).toBe(finalMessage);

    // console.log(wrapper);
  });
});
