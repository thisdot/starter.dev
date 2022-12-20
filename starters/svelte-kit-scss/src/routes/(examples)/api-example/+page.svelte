<script lang="ts">
  import Greeting from '$lib/components/Greeting/Greeting.svelte';
  import type { PageServerData } from './$types';

  export let data: PageServerData;

  $: ({ message } = data);
</script>

<Greeting {message} />
