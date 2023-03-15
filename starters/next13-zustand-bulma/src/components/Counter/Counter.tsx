'use client';
import { useCountStore } from '@/stores/count';

export function Counter() {
  const { count, increment, decrement, reset } = useCountStore();

  return (
    <div className="level is-size-4">
      <div className="level-item">
        <output className="has-text-weight-bold m-2 p-2">Count: {count}</output>
      </div>

      <div className="level-item">
        <button
          className="button is-primary is-fullwidth is-justify-content-center has-centered-text has-text-weight-bold is-size-5 m-2"
          onClick={increment}
        >
          Increment
        </button>
      </div>

      <div className="level-item">
        <button
          className="button is-primary is-fullwidth is-justify-content-center has-centered-text has-text-weight-bold is-size-5 m-2"
          onClick={decrement}
        >
          Decrement
        </button>
      </div>

      <div className="level-item">
        <button
          className="button is-primary is-fullwidth is-justify-content-center has-centered-text has-text-weight-bold is-size-5 m-2"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
