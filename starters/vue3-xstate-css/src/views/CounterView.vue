<script setup lang="ts">
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import HeaderComponent from '../components/HeaderComponent.vue';

const counterMachine = createMachine(
  {
    id: 'Counter',
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

const { state, send } = useMachine(counterMachine, { devTools: true });
</script>

<template>
  <main>
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
  </main>
</template>

<style scoped>
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

.counter__home-link {
  margin-top: 2%;
  text-align: center;
}
</style>
