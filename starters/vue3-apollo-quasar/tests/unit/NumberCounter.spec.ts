import { createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { NumberCounter } from '../../src/components';

describe('NumberCounter.vue', () => {
  const counterWrapper = mount(NumberCounter, {
    global: {
      plugins: [createPinia()],
    },
  });

  it('should contain an increment button', () => {
    console.log(counterWrapper);
    // console.log(mount(NumberCounter));
  });
  it('should contain an decrement button', () => {
    // console.log(mount(NumberCounter));
  });
  it('should contain a reset button', () => {
    // console.log(mount(NumberCounter));
  });

  it('should increment the counter by 1 when the increment button is clicked', () => {
    // console.log(mount(NumberCounter));
  });
  it('should decrement the counter by 1 when the decrement button is clicked', () => {
    // console.log(mount(NumberCounter));
  });
  it('should reset the value of the counter to 0', () => {
    // console.log(mount(NumberCounter));
  });
});
