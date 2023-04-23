<template>
	<div class="d-flex flex-column justify-center align-center mt-5">
		<NuxtLink to="/counter" class="text-subtitle-1 text-blue-darken-2">
			See Counter example component
		</NuxtLink>
		<NuxtLink to="/greet" class="text-subtitle-1 text-blue-darken-2 mt-4">
			See Fetch API example component
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'Nuxt 3, Pinia and Vuetify',
	meta: [
		{
			name: 'Nuxt 3, Pinia and Vuetify',
			content: 'Nuxt 3, Pinia and Vuetify kit',
		},
	],
});
</script>
