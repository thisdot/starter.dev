import { mount } from '@vue/test-utils';
import { reactive } from 'vue';
import { NumberCounter } from '../../src/components';
import { counter } from '../../src/globals/counter';

jest.useFakeTimers();

const data = reactive({
  result: {
    value: {
      count: counter(),
    },
  },
  loading: false,
});

jest.mock('@vue/apollo-composable', () => {
  return {
    useQuery: jest.fn(() => data),
  };
});

describe('NumberCounter.vue', () => {
  let counterWrapper;

  beforeEach(() => {
    counterWrapper = mount(NumberCounter);
  });


  it('should contain an increment button', () => {
    const btnIncrement = counterWrapper.find('[name="btn-increment"]');
    expect(btnIncrement.exists()).toBe(true);
  });
  it('should contain an decrement button', () => {
     const btnDecrement = counterWrapper.find('[name="btn-decrement"]');
    expect(btnDecrement.exists()).toBe(true);
  });
  it('should contain a reset button', () => {
    const btnReset = counterWrapper.find('[name="btn-reset"]');
    expect(btnReset.exists()).toBe(true);
  });

  it('should display counter value', () => {
    const textCounter = counterWrapper.find('[name="text-count"]');
    expect(textCounter.exists()).toBe(true);
  });
  it('should start the counter at 0', () => {
    const textCounter = counterWrapper.find('[name="text-count"]');
    expect(textCounter.text()).toEqual('0');
  });

  /** Generate an array with numbers from 1..10. This will represent our click counter */
  const testClickCycles = Array(10)
    .fill(0)
    .map((_, i) => i + 1);

  it.each(testClickCycles)(
    'should increment the counter by 1 when the increment button is clicked',
    async () => {
      const btnIncrement = counterWrapper.find('[name="btn-increment"]');
      const initialCount = counter();
      await btnIncrement.trigger('click');
      const countAfterClick = counter();

      expect(countAfterClick).toEqual(initialCount + 1);
    }
  );
  it.each(testClickCycles)(
    'should decrement the counter by 1 when the decrement button is clicked',
    async () => {
       const btnDecrement = counterWrapper.find('[name="btn-decrement"]');
      const initialCount = counter();
      await btnDecrement.trigger('click');
      const countAfterClick = counter();

      expect(countAfterClick).toEqual(initialCount - 1);
    }
  );

  it('should reset the value of the counter to 0 when the reset button is clicked', async () => {
    const btnReset = counterWrapper.find('[name="btn-reset"]');
    await btnReset.trigger('click');
    const countAfterClick = counter();

    expect(countAfterClick).toEqual(0);
  });
});
