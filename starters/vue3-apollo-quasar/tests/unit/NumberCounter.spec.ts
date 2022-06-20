import { mount } from '@vue/test-utils';
import { reactive } from 'vue';
import { NumberCounter } from '../../src/components';
import { counts } from '../../src/globalvariables/counts';

jest.useFakeTimers();

const data = reactive({
  result: {
    value: {
      count: counts(),
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
  const counterWrapper = mount(NumberCounter);

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

  it.each(testClickCycles)(
    'should increment the counter by 1 when the increment button is clicked',
    async () => {
      const initialCount = counts();
      await btnIncrement.trigger('click');
      const countAfterClick = counts();

      expect(countAfterClick).toEqual(initialCount + 1);
    }
  );
  it.each(testClickCycles)(
    'should decrement the counter by 1 when the decrement button is clicked',
    async () => {
      const initialCount = counts();
      await btnDecrement.trigger('click');
      const countAfterClick = counts();

      expect(countAfterClick).toEqual(initialCount - 1);
    }
  );

  it('should reset the value of the counter to 0 when the reset button is clicked', async () => {
    await btnReset.trigger('click');
    const countAfterClick = counts();

    expect(countAfterClick).toEqual(0);
  });
});
