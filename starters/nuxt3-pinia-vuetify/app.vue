<template>
	<div class="v-theme--customTheme d-flex flex-column justify-center align-center mt-5">
		<header class="bg-blue-darken-2 w-50 pa-4 text-center rounded mb-5">
			<h1 class="text-h4 font-weight-bold text-white">
				Nuxt 3, Pinia and Vuetify Starter kit
			</h1>
		</header>

		<NuxtPage />

		<NuxtLink
			v-if="Route.path !== '/'"
			to="/"
			class="text-h6 text-primary mt-10"
		>
			Return Home
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup>
const Route = useRoute()
</script>
