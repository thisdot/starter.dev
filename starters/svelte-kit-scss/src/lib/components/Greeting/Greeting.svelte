<script lang="typescript">
	export let message: string;
</script>

<div class="fetch-container">
	<header>
		<h1>SvelteKit Fetch Data from API</h1>
	</header>
	<p>
		Message: {message}
	</p>
</div>

<style lang="scss">
	.fetch-container {
		text-align: center;

		header {
			margin: 20px auto;
			width: 40%;

			h1 {
				padding: 15px 0;
				font-size: 2rem;
				text-align: center;
				border-bottom: 5px solid rgb(29 78 216);
			}
		}

		p {
			font-size: 1.2rem;
			display: flex;
			justify-content: center;
		}
	}
</style>