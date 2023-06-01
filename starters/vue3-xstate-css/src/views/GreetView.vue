<script setup lang="ts">
import { inject } from 'vue';
import { useMachine } from '@xstate/vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import { greetMachine } from '../machines/greetMachine';

// the empty string here sets the default value to inject - so if we're not provided with a value, it will use an empty string
const providedQuery = inject('query', '');

const { state } = useMachine(greetMachine(providedQuery), {
	devTools: true,
});
</script>

<template>
	<HeaderComponent> Fetch Data from API </HeaderComponent>
	<section class="fetch__section">
		<p class="fetch__section-title">Message:</p>
		<div class="fetch__section-result" data-cy="message-result">
			<div v-if="state.value === 'loading'" class="fetch__section-loader"></div>
			<p v-if="state.value === 'failure'" class="fetch__section-message-fail">
				{{ state.context.error }}
			</p>
			<p v-else class="fetch__section-message-success">
				{{ state.context.message }}
			</p>
		</div>
	</section>
	<div class="fetch__home-link">
		<RouterLink to="/">Return Home</RouterLink>
	</div>
</template>

<style scoped>
.fetch__section {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 2em auto;
}

.fetch__section p {
	font-size: 1.25rem;
}

.fetch__section-title {
	width: 8rem;
	text-align: center;
	font-weight: bold;
}

.fetch__section-result {
	width: 20rem;
}

.fetch__section-message-fail {
	background-color: var(--red);
	padding: 0.25em 0.5em;
	border-radius: 4px;
}

.fetch__section-loader {
	background-color: var(--gray);
	height: 1.7rem;
	border-radius: 4px;
}

.fetch__home-link {
	margin-top: 0.5em;
	text-align: center;
}

@media screen and (max-width: 600px) {
	.fetch__section {
		flex-direction: column;
	}

	.fetch__section p {
		text-align: center;
	}
}
</style>
