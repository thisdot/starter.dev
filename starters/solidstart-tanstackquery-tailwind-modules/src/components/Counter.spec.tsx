import { describe, test, expect } from 'vitest';
import { fireEvent, render } from 'solid-testing-library'
import Counter from './Counter';

describe('<Counter />', () => {

  test('Counter mounts', async () => {
    const { unmount, queryByTestId, getByText } = render(() => <Counter />);
    const button: any = await queryByTestId('counter_btn')
    await fireEvent.click(button)
    const result = await getByText('Clicks: 1');
    expect(result).toBeTruthy();
    unmount();
  });
})
