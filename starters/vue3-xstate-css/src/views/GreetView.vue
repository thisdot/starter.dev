<script setup lang="ts">
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/vue';
import HeaderComponent from '../components/HeaderComponent.vue';

const fetchGreeting = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const endpoint = `https://api.starter.dev/.netlify/functions/server/hello?greeting=${encodedMessage}`;
  return fetch(endpoint).then((result) => result.text());
};

const greetMachine = createMachine(
  {
    id: 'greet',
    predictableActionArguments: true,
    schema: {
      context: {} as { query: string; message: string; error: string },
      services: {} as {
        callFetchMessage: {
          data: { result: string };
        };
      },
    },
    initial: 'loading',
    context: {
      query: 'from This Dot Labs!',
      message: '',
      error: '',
    },
    states: {
      loading: {
        invoke: {
          src: 'callFetchMessage',
          onDone: {
            target: 'complete',
            actions: assign({
              message: (_context, event) => event.data,
            }),
          },
          onError: {
            target: 'failure',
            actions: assign({
              error: (_context, event) => event.data.message,
            }),
          },
        },
      },
      complete: {
        type: 'final',
      },
      failure: {
        type: 'final',
      },
    },
  },
  {
    services: {
      callFetchMessage: (context) => fetchGreeting(context.query),
    },
  }
);

const { state } = useMachine(greetMachine, { devTools: true });
</script>

<template>
  <main>
    <HeaderComponent> Fetch Data from API </HeaderComponent>
    <section class="fetch__section">
      <p class="fetch__section-title">Message:</p>
      <div class="fetch__section-result">
        <div
          v-if="state.value === 'loading'"
          class="fetch__section-loader"
        ></div>
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
  </main>
</template>

<style scoped>
.fetch__section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 3% auto;
}

.fetch__section p {
  font-size: 1.3rem;
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
  padding: 0.5% 2%;
  border-radius: 3px;
}

.fetch__section-loader {
  background-color: var(--gray);
  height: 1.7rem;
  border-radius: 3px;
}

.fetch__home-link {
  margin-top: 2%;
  text-align: center;
}
</style>
