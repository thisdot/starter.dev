<script setup lang="ts">
import { useMachine } from '@xstate/vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import { counterMachine } from '../machines/counterMachine';

const { state, send } = useMachine(counterMachine, { devTools: true });
</script>

<template>
	<HeaderComponent>
		Increment, Decrement and Reset Button Examples
	</HeaderComponent>
	<section class="counter__section">
		<p data-cy="count">Count: {{ state.context.count }}</p>
		<ButtonComponent @click="send('INC')" data-cy="inc-button">
			Increment
		</ButtonComponent>
		<ButtonComponent @click="send('DEC')" data-cy="dec-button">
			Decrement
		</ButtonComponent>
		<ButtonComponent @click="send('RESET')" data-cy="res-button">
			Reset
		</ButtonComponent>
	</section>
	<div class="counter__home-link">
		<RouterLink to="/">Return Home</RouterLink>
	</div>
</template>

<style scoped>
.counter__section {
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	margin: 2em auto;
}

p {
	font-weight: 600;
	font-size: 1.5rem;
	flex-basis: 9.5rem;
}

.counter__home-link {
	margin-top: 0.5em;
	text-align: center;
}

@media screen and (max-width: 768px) {
	.counter__section {
		flex-direction: column;
	}

	p {
		flex-basis: 4rem;
	}
}
</style>
