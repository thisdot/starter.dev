import { createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { NumberCounter } from '../../src/components';

jest.useFakeTimers();

describe('NumberCounter.vue', () => {
  const counterWrapper = mount(NumberCounter, {
    global: {
      plugins: [createPinia()],
    },
  });

  const btnIncrement = counterWrapper.find('[name="btn-increment"]');
  const btnDecrement = counterWrapper.find('[name="btn-decrement"]');
  const btnReset = counterWrapper.find('[name="btn-reset"]');
  const textCounter = counterWrapper.find('[name="text-count"]');

  it('should contain an increment button', () => {
    expect(btnIncrement.exists()).toBe(true);
  });
  it('should contain an decrement button', () => {
    expect(btnDecrement.exists()).toBe(true);
  });
  it('should contain a reset button', () => {
    expect(btnReset.exists()).toBe(true);
  });

  it('should display counter value', () => {
    expect(textCounter.exists()).toBe(true);
  });
  it('should start the counter at 0', () => {
    expect(textCounter.text()).toEqual('0');
  });

  /** Generate an array with numbers from 1..10. This will represent our click counter */
  const testClickCycles = Array(10)
    .fill(0)
    .map((_, i) => i + 1);

  /** Get the counter number as an integer. Exists to keep code DRY */
  const getCountNumber = () => parseInt(textCounter.text());

  it.each(testClickCycles)(
    'should increment the counter by 1 when the increment button is clicked',
    async () => {
      const initialCount = getCountNumber();
      await btnIncrement.trigger('click');
      const countAfterClick = getCountNumber();

      expect(countAfterClick).toEqual(initialCount + 1);
    }
  );
  it.each(testClickCycles)(
    'should decrement the counter by 1 when the decrement button is clicked',
    async () => {
      const initialCount = getCountNumber();
      await btnDecrement.trigger('click');
      const countAfterClick = getCountNumber();

      expect(countAfterClick).toEqual(initialCount - 1);
    }
  );

  it('should reset the value of the counter to 0 when the reset button is clicked', async () => {
    await btnReset.trigger('click');
    const countAfterClick = getCountNumber();

    expect(countAfterClick).toEqual(0);
  });
});
