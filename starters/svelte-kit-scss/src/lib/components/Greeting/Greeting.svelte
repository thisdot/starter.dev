<script lang="ts">
  export let message: string;
</script>

<div class="fetch-container">
  <header>
    <h1>SvelteKit Fetch Data from API</h1>
  </header>
  <div>
    Message: {message}
  </div>
</div>

<style lang="scss">
  .fetch-container {
    text-align: center;

    header {
      margin: 1.25rem auto;
      width: 40%;

      h1 {
        padding: 0.9375rem 0;
        font-size: 2rem;
        text-align: center;
        border-bottom: 5px solid #1d4ed8;
      }
    }

    div {
      font-size: 1.2rem;
      display: flex;
      justify-content: center;
    }
  }
</style>
