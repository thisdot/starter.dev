<template>
  <div class="flex flex-col justify-center items-center gap-5 mt-10">
    <h1 class="text-4xl font-semibold">
      Increment, Decrement and Reset Button Examples
    </h1>
    <hr />
    <div class="flex gap-5 justify-center items-center">
      <p class="text-4xl">Count: {{ counterState.counter }}</p>

      <button
        class="text-white text-base w-50 h-50 bg-blue-500 font-bold hover:bg-blue-700 rounded-md p-2"
        @click="increaseCount"
      >
        Increase
      </button>

      <button
        class="text-white text-base w-50 h-50 bg-blue-500 font-bold hover:bg-blue-700 rounded-md p-2"
        @click="decreaseCount"
      >
        Decrease
      </button>

      <button
        class="text-white text-base w-50 h-50 bg-blue-500 font-bold hover:bg-blue-700 rounded-md p-2"
        @click="resetCount"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useCounterStore } from '../../stores/counterStore'

export default {
  name: 'TheCounter',
  setup() {
    const counterState = useCounterStore()

    const increaseCount = () => {
      counterState.counter = counterState.counter + 1
    }

    const decreaseCount = () => {
      if (counterState.counter) {
        counterState.counter = counterState.counter - 1
      }
    }

    const resetCount = () => {
      counterState.$reset()
    }

    return { counterState, increaseCount, decreaseCount, resetCount }
  },
}
</script>
