<template>
  <div class="flex flex-col justify-center items-center gap-5 mt-10">
    <header class="border-b-4 border-blue-600 w-3/5 pb-4 text-center">
      <h1 class="text-4xl font-bold">
        Increment, Decrement and Reset Button Examples
      </h1>
    </header>

    <div class="flex gap-20 justify-center items-center">
      <p class="text-2xl font-bold" data-testid="count-value">
        Count:{{ counterState.counter }}
      </p>

      <button
        class="text-white text-lg bg-blue-500 font-bold hover:bg-blue-700 rounded py-1 px-3"
        data-testid="increase-button"
        @click="increaseCount"
      >
        Increment
      </button>

      <button
        class="text-white text-lg bg-blue-500 font-bold hover:bg-blue-700 rounded py-1 px-3"
        data-testid="decrease-button"
        @click="decreaseCount"
      >
        Decrement
      </button>

      <button
        class="text-white text-lg bg-blue-500 font-bold hover:bg-blue-700 rounded py-1 px-3"
        data-testid="reset-button"
        @click="resetCount"
      >
        Reset
      </button>
    </div>
    <NuxtLink
      to="/"
      class="text-lg text-blue-600 underline hover:text-blue-400"
    >
      Return Home
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCounterStore } from '~/stores/counterStore'

export default defineComponent({
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
})
</script>
