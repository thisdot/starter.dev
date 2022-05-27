<template>
  <div :class="styles.container">
    <header :class="styles.header">
      <h1 :class="styles.h1Header">
        Increment, Decrement and Reset Button Examples
      </h1>
    </header>

    <div :class="styles.controlsContainer">
      <p :class="styles.paragraph" data-testid="count-value">
        Count:{{ counterState.counter }}
      </p>

      <button
        :class="styles.counterButton"
        data-testid="increase-button"
        @click="increaseCount"
      >
        Increment
      </button>

      <button
        :class="styles.counterButton"
        data-testid="decrease-button"
        @click="decreaseCount"
      >
        Decrement
      </button>

      <button
        :class="styles.counterButton"
        data-testid="reset-button"
        @click="resetCount"
      >
        Reset
      </button>
    </div>
    <NuxtLink to="/" :class="styles.link">
      Return Home
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import * as styles from './TheCounter.classNames'
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
    return { counterState, styles, increaseCount, decreaseCount, resetCount }
  },
})
</script>
