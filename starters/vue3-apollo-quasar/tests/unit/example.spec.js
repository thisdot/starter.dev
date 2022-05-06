import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const message = 'Heppy';
    const wrapper = shallowMount(HelloWorld, {
      props: { message },
    });
    expect(wrapper.text()).toMatch(message);
  });
});
