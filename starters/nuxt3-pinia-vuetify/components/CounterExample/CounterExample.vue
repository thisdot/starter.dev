<template>
  <div class="counter-example-box d-flex flex-column justify-center align-center mt-5">
    <div class="counter-example-box__header border-b-4 border-blue-600 mb-4 text-center">
      <h4 class="text-h5 font-weight-bold">
        Increment, Decrement and Reset Button Examples
      </h4>
    </div>

    <div class="d-flex flex-row justify-center align-center mt-5 mb-10">
		<p class="text-h5 mr-5">
			count: <span class="font-weight-bold">{{ counterState.counter }}</span>
		</p>
		<div>
			<v-btn class="ma-2 bg-primary" variant="tonal" @click="increaseCount">
				increment
			</v-btn>

			<v-btn class="ma-2 bg-primary" variant="tonal" @click="decreaseCount">
				decrement
			</v-btn>

			<v-btn class="ma-2 bg-primary" variant="tonal" @click="resetCount">
				reset
			</v-btn>
		</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '~~/store/counterStore';

const counterState = useCounterStore();

const increaseCount = () => {
  counterState.counter++;
};

const decreaseCount = () => {
  if (counterState.counter) {
    counterState.counter--;
  }
};

const resetCount = counterState.$reset.bind(counterState);
</script>

<style lang="scss">
.counter-example-box {
	&__header {
		border-bottom: 4px solid rgb(var(--v-theme-primary));
	}
}
</style>
