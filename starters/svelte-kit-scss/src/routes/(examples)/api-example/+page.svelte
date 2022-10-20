<script lang="ts">
	import Greeting from './Greeting.svelte';

	export let data: {
		message: string;
	};
</script>

<Greeting message={data.message} />
