<template>
	<div class="fetch-example-box d-flex flex-column justify-center align-center mt-5">
		<div class="fetch-example-box__header border-b-4 border-blue-600 mb-4 text-center">
			<h4 class="text-h5 font-weight-bold">
				Fetch Data From API
			</h4>
		</div>

		<div class="d-flex flex-row justify-center align-center mt-5 mb-10 text-h6">
			<p>Message:</p>
			<p class="ml-5 font-weight-bold">
				{{ message }}
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
const { data: message } = useLazyFetch('https://api.starter.dev/hello?greeting=from This Dot Labs!');
</script>

<style lang="scss">
.fetch-example-box {
	&__header {
		border-bottom: 4px solid rgb(var(--v-theme-primary));
	}
}
</style>