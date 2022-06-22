<template>
  <section class="row q-col-gutter-lg q-px-md q-mt-md">
    <div class="col-3">
      <h6 class="text-weight-bold q-my-none">
        Count: <span name="text-count" v-if="!loading">{{ count }}</span>
      </h6>
    </div>
    <div class="col-3">
      <q-btn name="btn-increment" color="primary" unelevated @click="increment"
        >Increment</q-btn
      >
    </div>
    <div class="col-3">
      <q-btn name="btn-decrement" color="primary" unelevated @click="decrement"
        >Decrement</q-btn
      >
    </div>
    <div class="col-3">
      <q-btn name="btn-reset" color="primary" unelevated @click="reset"
        >Reset</q-btn
      >
    </div>

    <div class="col-12 text-center">
      <router-link class="text-primary" to="/">Return home</router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'NumberCounter',
});
</script>

<script lang="ts" setup>
import { increment, decrement, reset } from 'src/globals/counter';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const COUNTER_QUERY = gql`
  query Counter {
    count @client
  }
`;

const { result, loading } = useQuery(COUNTER_QUERY);

const count = computed(() => (result.value ? result.value.count : 0));
</script>
