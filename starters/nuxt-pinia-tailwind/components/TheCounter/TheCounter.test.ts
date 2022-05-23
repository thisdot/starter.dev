import Vue from 'vue';
import { render, screen, fireEvent } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import { PiniaVuePlugin } from 'pinia'
import TheCounter from './TheCounter.vue'



describe('<TheCounter />', () => {
  beforeEach(() => {
    Vue.use(PiniaVuePlugin);
  });

  it('Should increase by 1 the count when clicking increase button', async () => {
    // Arrange
    render(TheCounter, {
      pinia: createTestingPinia(),
      stubs: {
        NuxtLink: true,
      },
    })

    const button = screen.getByTestId('increase-button')
    const countValue = screen.getByTestId('count-value')

    // Assertions
    expect(countValue).toHaveTextContent('0')

    await fireEvent.click(button)
    expect(countValue).toHaveTextContent('1')

    await fireEvent.click(button)
    expect(countValue).toHaveTextContent('2')
  })

  it('Should decrease by 1 the count when clicking decrease button', async () => {
    // Arrange
    render(TheCounter, {
      pinia: createTestingPinia({
        initialState: {
          counterStore: {
            counter: 5,
          },
        },
      }),
      stubs: {
        NuxtLink: true,
      }
    })
    const button = screen.getByTestId('decrease-button')
    const countValue = screen.getByTestId('count-value')

    // Assertions
    expect(countValue).toHaveTextContent('5')

    await fireEvent.click(button)
    expect(countValue).toHaveTextContent('4')

    await fireEvent.click(button)
    expect(countValue).toHaveTextContent('3')
  })

  it('Should reset the count when clicking the reset button', async () => {
    // Arrange
    render(TheCounter, {
      pinia: createTestingPinia({
        initialState: {
          counterStore: {
            counter: 5,
          },
        },
      }),
      stubs: {
        NuxtLink: true,
      }
    })
    const button = screen.getByTestId('reset-button')
    const countValue = screen.getByTestId('count-value')

    // Assertions
    expect(countValue).toHaveTextContent('5')

    await fireEvent.click(button)
    expect(countValue).toHaveTextContent('0')
  })
})


