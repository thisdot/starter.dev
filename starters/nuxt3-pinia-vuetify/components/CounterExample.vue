<script lang="ts" setup>
import { useCounterStore } from '@/store/counterStore';

const counterStore = useCounterStore();

const counter = computed(() => counterStore.counter);

const incrementCount = () => counterStore.counter++;
const decrementCount = () => counterStore.counter--;

const resetCount = counterStore.$reset.bind(counterStore);
</script>

<template>
	<div class="counter-example-box w-75">
		<div
			class="counter-example-box__header border-b-4 border-blue-600 mb-4 text-center"
		>
			<h4 class="text-h4 font-weight-bold py-4">
				Increment, Decrement and Reset Button Example
			</h4>
		</div>

		<div class="d-flex flex-row justify-space-evenly align-center py-5">
			<p class="text-h5 mr-5 font-weight-bold">
				Count:
				<span>{{ counter }}</span>
			</p>
			<v-btn
				class="ma-2 bg-primary font-weight-bold"
				variant="tonal"
				@click="incrementCount"
			>
				increment
			</v-btn>

			<v-btn
				class="ma-2 bg-primary font-weight-bold"
				variant="tonal"
				@click="decrementCount"
			>
				decrement
			</v-btn>

			<v-btn
				class="ma-2 bg-primary font-weight-bold"
				variant="tonal"
				@click="resetCount"
			>
				reset
			</v-btn>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.counter-example-box {
	&__header {
		border-bottom: 4px solid rgb(var(--v-theme-primary));
	}
}
</style>
