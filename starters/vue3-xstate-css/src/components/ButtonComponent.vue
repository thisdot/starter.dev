<script setup lang="ts"></script>

<template>
	<button>
		<slot />
	</button>
</template>

<style scoped>
button {
	width: 9.5rem;
	background: var(--lightBlue);
	color: var(--white);
	font-weight: bold;
	font-size: 1.25rem;
	padding: 0.5em 0.25em;
	border-radius: 4px;
	border-color: var(--lightBlue);
	cursor: pointer;
}

@media screen and (max-width: 768px) {
	button {
		width: 12.5rem;
		margin: 0.5em;
		padding: 1em;
	}
}
</style>
