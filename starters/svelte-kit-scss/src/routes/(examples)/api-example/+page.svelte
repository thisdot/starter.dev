<script lang="ts">
  import Greeting from '$lib/components/Greeting/Greeting.svelte';
  import { getGreeting } from '$lib/helpers/greeting';
  import { onMount } from 'svelte';

  let message: string = '';

  onMount(async () => {
		message = await getGreeting('This Dot Labs!');
	});
</script>

<Greeting message={message} />

