<script>
  import Counter from '$lib/components/Counter/Counter.svelte';
</script>

<div class="container">
  <h1>Increment, Decrement and Reset Button Example</h1>
  <div class="counter">
    <Counter />
  </div>
</div>

<style lang="scss">
  .container {
    h1 {
      font-size: 2rem;
      font-weight: 700;
      border-bottom: 4px solid #2563eb;
      padding: 1rem 0;
      margin: 1.25rem auto;
    }
    .counter {
      padding: 1.25rem 0;
    }
  }
</style>
