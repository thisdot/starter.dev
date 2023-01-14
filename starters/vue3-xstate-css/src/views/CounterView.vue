<script setup lang="ts">
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/vue';

const counterMachine = createMachine({
  id: 'counter',
  initial: 'reset',
  context: {
    count: 0,
  },
  states: {
    reset: {},
  },
});

const { state, send } = useMachine(counterMachine);
</script>

<template>
  <main>
    <h1>Increment, Decrement and Reset Button Examples</h1>
    <section class="counter__section">
      <p>Count: {{ state.value }}</p>
      <button>Increment</button>
      <button>Decrement</button>
      <button>Reset</button>
    </section>
    <div class="counter__home-link">
      <RouterLink to="/">Return Home</RouterLink>
    </div>
  </main>
</template>

<style scoped>
h1 {
  font-weight: bold;
  text-align: center;
  border-bottom: 3px solid var(--lightBlue);
  padding-bottom: 1%;
}

.counter__home-link {
  margin-top: 2%;
  text-align: center;
}
</style>
