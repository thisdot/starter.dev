<script lang="ts">
  import Greeting from '$lib/components/Greeting/Greeting.svelte';

  export let data: {
    message: string;
  };
</script>

<Greeting message={data.message} />