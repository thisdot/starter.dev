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

<template>
	<main class="w-50">
		<header class="bg-blue-darken-2 pa-4 text-center rounded mb-5">
			<h1 class="text-h5 font-weight-bold text-white">
				Nuxt 3, Pinia and Vuetify Starter kit
			</h1>
		</header>
		<div class="d-flex flex-column justify-center align-center mt-4">
			<NuxtLink to="/counter" class="text-subtitle-1 text-blue-darken-2">
				See Counter example component
			</NuxtLink>
			<NuxtLink to="/greet" class="text-subtitle-1 text-blue-darken-2 mt-2">
				See Fetch example component
			</NuxtLink>
		</div>
	</main>
</template>
