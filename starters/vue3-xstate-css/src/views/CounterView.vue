<script setup lang="ts">
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/vue';

const counterMachine = createMachine(
  {
    predictableActionArguments: true,
    schema: {
      context: {} as { count: number },
      events: {} as { type: 'INC' } | { type: 'DEC' } | { type: 'RESET' },
    },
    initial: 'active',
    context: {
      count: 0,
    },
    states: {
      active: {
        on: {
          INC: { actions: 'increment' },
          DEC: { actions: 'decrement' },
          RESET: { actions: 'reset' },
        },
      },
    },
  },
  {
    actions: {
      increment: assign({ count: (context) => context.count + 1 }),
      decrement: assign({ count: (context) => context.count - 1 }),
      reset: assign({ count: (context) => (context.count = 0) }),
    },
  }
);

const { state, send } = useMachine(counterMachine);
</script>

<template>
  <main>
    <h1>Increment, Decrement and Reset Button Examples</h1>
    <section class="counter__section">
      <p>Count: {{ state.context.count }}</p>
      <button @click="send('INC')">Increment</button>
      <button @click="send('DEC')">Decrement</button>
      <button @click="send('RESET')">Reset</button>
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

.counter__section {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 4% auto;
}

p {
  font-weight: bold;
  font-size: 1.5rem;
  flex-basis: 9.5rem;
}

button {
  width: 9.5rem;
  background: var(--lightBlue);
  color: var(--white);
  font-weight: bold;
  font-size: 1.05rem;
  padding: 1% 2%;
  border-radius: 3px;
  border-color: var(--lightBlue);
}

.counter__home-link {
  margin-top: 2%;
  text-align: center;
}
</style>
