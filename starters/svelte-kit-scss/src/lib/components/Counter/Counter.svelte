<script lang="ts">
  import { onMount } from 'svelte';
  import { count, incrementCount, decrementCount, resetCount } from '../../stores';

  onMount(async () => {
    resetCount();
  });
</script>

<div class="container">
  <span class="result">Count: {$count}</span>
  <button on:click={incrementCount}>Increment</button>
  <button on:click={decrementCount}>Decrement</button>
  <button on:click={resetCount}>Reset</button>
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
