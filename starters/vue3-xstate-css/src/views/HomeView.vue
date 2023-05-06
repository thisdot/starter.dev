<script setup lang="ts"></script>

<template>
	<div class="home__title">
		<h1>Vue 3 + XState + CSS</h1>
	</div>
	<nav class="home__links">
		<RouterLink to="/counter">See counter example component</RouterLink>
		<RouterLink to="/greet">See fetch example component</RouterLink>
	</nav>
</template>

<style scoped>
.home__title {
	width: 80%;
	padding: 1% 2%;
	margin: 0 auto 5%;
	border-radius: 4px;
	background: var(--lightBlue);
}

h1 {
	color: var(--white);
	text-align: center;
}

.home__links {
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	text-align: center;
}
</style>
