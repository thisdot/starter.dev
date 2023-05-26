<script lang="ts" setup>
const Route = useRoute();
const {
	public: { baseUrl },
} = useRuntimeConfig();
</script>

<template>
	<div
		class="v-theme--customTheme d-flex flex-column justify-center align-center mt-5"
	>
		<NuxtPage />

		<NuxtLink
			v-if="Route.path !== baseUrl"
			:to="baseUrl"
			class="text-h6 text-primary mt-3"
		>
			Return Home
		</NuxtLink>
	</div>
</template>
