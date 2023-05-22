<script lang="ts" setup>
const route = useRoute();
const greeting = ref(route.query.greeting ?? 'from This Dot Labs!');

const {
	data,
	pending: loading,
	error,
} = await useLazyFetch<string>(
	() =>
		`https://api.starter.dev/.netlify/functions/server/hello?greeting=${greeting.value}`,
	{
		watch: [greeting],
	}
);

watch(
	() => route.query.greeting,
	() => {
		greeting.value = route.query.greeting ?? 'from This Dot Labs!';
	}
);
</script>

<template>
	<div class="fetch-example-box w-50">
		<div
			class="fetch-example-box__header border-b-4 border-blue-600 mb-4 text-center"
		>
			<h4 class="text-h4 font-weight-bold py-4">Nuxt 3 Fetch Data From API</h4>
		</div>

		<div class="d-flex flex-row justify-center align-center mb-10 text-h6">
			<p v-if="!error">Message:</p>
			<div class="ml-2 font-weight-bold">
				<v-progress-circular v-if="loading" indeterminate></v-progress-circular>

				<v-alert
					v-else-if="error"
					type="error"
					title="Error"
					:text="error.message"
					variant="tonal"
				>
				</v-alert>

				<p v-else data-testid="message-value">
					{{ data }}
				</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.fetch-example-box {
	&__header {
		border-bottom: 4px solid rgb(var(--v-theme-primary));
	}
}
</style>
