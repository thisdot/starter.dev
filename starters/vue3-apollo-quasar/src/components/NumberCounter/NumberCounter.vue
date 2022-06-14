<template>
  <section class="row q-col-gutter-lg q-px-md q-mt-md">
    <div class="col-3">
      <h6 class="text-weight-bold q-my-none">
        Count: <span name="text-count" v-if="!loading">{{ count }}</span>
      </h6>
    </div>
    <div class="col-3">
      <q-btn
        name="btn-increment"
        color="primary"
        unelevated
        @click="updateCount(1)"
        >Increment</q-btn
      >
    </div>
    <div class="col-3">
      <q-btn
        name="btn-decrement"
        color="primary"
        unelevated
        @click="updateCount(-1)"
        >Decrement</q-btn
      >
    </div>
    <div class="col-3">
      <q-btn name="btn-reset" color="primary" unelevated @click="updateCount(0)"
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
import { counts } from 'src/variables/counts';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const COUNTERS_QUERY = gql`
  query Counter {
    count @client
  }
`;

const { result, loading } = useQuery(COUNTERS_QUERY);

const count = computed(() => (result.value ? result.value.count : 0));

const updateCount = (countValue: number) => {
  let cnts = counts();
  switch (countValue) {
    case 1:
      cnts++;
      break;
    case -1:
      cnts--;
      break;

    default:
      cnts = 0;
      break;
  }
  counts(cnts);
};
</script>
