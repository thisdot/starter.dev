import Vue from 'vue';
import { createTestingPinia } from '@pinia/testing';
import { PiniaVuePlugin } from 'pinia';
import CounterExample from './CounterExample.vue';
import { fireEvent, render, screen } from '@/test/utils';

describe('<CounterExample />', () => {
  beforeEach(() => {
    Vue.use(PiniaVuePlugin);
  });

  it('Should increase by 1 the count when clicking increase button', async () => {
    // Arrange
    const componentOptions = {
      pinia: createTestingPinia(),
      stubs: {
        NuxtLink: true,
      },
    }

    // Act
    render(CounterExample, componentOptions);
    const button = screen.getByTestId('increase-button');
    const countValue = screen.getByTestId('count-value');

    // Assertions
    expect(countValue).toHaveTextContent('0');

    await fireEvent.click(button);
    expect(countValue).toHaveTextContent('1');

    await fireEvent.click(button);
    expect(countValue).toHaveTextContent('2');
  });

  it('Should decrease by 1 the count when clicking decrease button', async () => {
    // Arrange
    const componentOptions = {
      pinia: createTestingPinia({
        initialState: {
          counterStore: {
            counter: 5,
          },
        },
      }),
      stubs: {
        NuxtLink: true,
      },
    }


    // Act
    render(CounterExample, componentOptions);
    const button = screen.getByTestId('decrease-button');
    const countValue = screen.getByTestId('count-value');

    // Assertions
    expect(countValue).toHaveTextContent('5');

    await fireEvent.click(button);
    expect(countValue).toHaveTextContent('4');

    await fireEvent.click(button);
    expect(countValue).toHaveTextContent('3');
  });

  it('Should reset the count when clicking the reset button', async () => {
    // Arrange
    const componentOptions = {
      pinia: createTestingPinia({
        initialState: {
          counterStore: {
            counter: 5,
          },
        },
      }),
      stubs: {
        NuxtLink: true,
      },
    }
    
    // Act
    render(CounterExample, componentOptions);
    const button = screen.getByTestId('reset-button');
    const countValue = screen.getByTestId('count-value');

    // Assertions
    expect(countValue).toHaveTextContent('5');

    await fireEvent.click(button);
    expect(countValue).toHaveTextContent('0');
  });
});
