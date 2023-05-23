<script setup lang="ts"></script>

<template>
	<h1>
		<slot />
	</h1>
</template>

<style scoped>
h1 {
	font-weight: bold;
	text-align: center;
	border-bottom: 3px solid var(--lightBlue);
	padding-bottom: 0.5em;
}
</style>
