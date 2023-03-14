import { renderHook, act } from '@testing-library/react';
import { useCountStore } from './count';

describe('useCountStore', () => {
  test('has an initial value of 0', () => {
    expect(useCountStore.getState().count).toBe(0);
  });

  test('increase count when increment is called', () => {
    const { result } = renderHook(() => useCountStore());
    expect(result.current.count).toBe(0);

    act(() => result.current.increment());

    expect(result.current.count).toBe(1);
  });

  test('decrease count when decrement is called', () => {
    const { result } = renderHook(() => useCountStore());
    act(() => result.current.increment());
    act(() => result.current.increment());
    act(() => result.current.increment());
    expect(result.current.count).toBe(3);

    act(() => result.current.reset());

    expect(result.current.count).toBe(0);
  });

  test('reset count to 0 when reset', () => {
    const { result } = renderHook(() => useCountStore());
    expect(result.current.count).toBe(0);

    act(() => result.current.decrement());

    expect(result.current.count).toBe(-1);
  });
});
