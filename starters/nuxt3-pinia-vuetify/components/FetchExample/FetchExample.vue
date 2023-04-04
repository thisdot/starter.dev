<template>
	<div
		class="fetch-example-box d-flex flex-column justify-center align-center mt-5"
	>
		<div
			class="fetch-example-box__header border-b-4 border-blue-600 mb-4 text-center"
		>
			<h4 class="text-h5 font-weight-bold">Fetch Data From API</h4>
		</div>

		<div class="d-flex flex-row justify-center align-center mt-5 mb-10 text-h6">
			<p>Message:</p>
			<div class="ml-5 font-weight-bold">
				<v-progress-circular v-if="loading" indeterminate></v-progress-circular>

				<p v-else-if="error">
					<span class="text-red-600">Error: </span>
					An error occurred while fetching data.
				</p>

				<p v-else data-testid="message-value">
					{{ data }}
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const greeting = 'from This Dot Labs!';
const {
	data,
	pending: loading,
	error,
} = await useLazyFetch<string>(
	`https://api.starter.dev/.netlify/functionds/server/hello?greeting=${greeting}`
);
watch(
	() => error,
	(error) => {
		if (error.value) {
			error.value.message = 'An error occurred while fetching data.';
		}
	}
);
</script>

<style lang="scss" scoped>
.fetch-example-box {
	&__header {
		border-bottom: 4px solid rgb(var(--v-theme-primary));
	}
}
</style>
