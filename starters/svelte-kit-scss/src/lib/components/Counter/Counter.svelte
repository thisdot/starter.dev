<script lang="ts">
  import { countStore } from '../../stores';

  const reset = (): void => countStore.set(0);
  const increment = (): void => countStore.update((x) => x + 1);
  const decrement = (): void => countStore.update((x) => x - 1);

  let count: number;

  countStore.subscribe((value) => {
    count = value;
  });
</script>

<div class="container">
  <span class="result">Count: {count}</span>
  <button on:click={increment}>Increment</button>
  <button on:click={decrement}>Decrement</button>
  <button on:click={reset}>Reset</button>
</div>

<style lang="scss">
  .container {
    display: flex;
    justify-content: space-evenly;
    white-space: nowrap;

    .result {
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 700;
      vertical-align: middle;
    }
    button {
      border: none;
      border-radius: 0.25rem;
      background-color: #3b82f6;
      padding: 0.5rem 1rem;
      vertical-align: middle;
      font-family: inherit;
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1;
      color: #ffffff;
      cursor: pointer;
    }
  }
</style>
