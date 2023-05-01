<script lang="ts" setup>
import { useCounterStore } from '@/store/counterStore';

const counterState = useCounterStore();

const increaseCount = () => counterState.counter++;
const decreaseCount = () => counterState.counter--;

const resetCount = counterState.$reset.bind(counterState);
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
				<span>{{ counterState.counter }}</span>
			</p>
			<v-btn
				class="ma-2 bg-primary font-weight-bold"
				variant="tonal"
				@click="increaseCount"
			>
				increment
			</v-btn>

			<v-btn
				class="ma-2 bg-primary font-weight-bold"
				variant="tonal"
				:disabled="counterState.counter === 0"
				@click="decreaseCount"
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
