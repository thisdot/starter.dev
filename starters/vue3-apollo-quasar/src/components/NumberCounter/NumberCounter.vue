<template>
  <section class="row q-col-gutter-lg q-px-md">
    <div class="col-3">
      <h6 class="text-weight-bold q-my-none">
        Count: <span name="text-count">{{ counter.count }}</span>
      </h6>
    </div>
    <div class="col-3">
      <q-btn
        name="btn-increment"
        color="primary"
        unelevated
        @click="counter.increment"
        >Increment</q-btn
      >
    </div>
    <div class="col-3">
      <q-btn
        name="btn-decrement"
        color="primary"
        unelevated
        @click="counter.decrement"
        >Decrement</q-btn
      >
    </div>
    <div class="col-3">
      <q-btn name="btn-reset" color="primary" unelevated @click="counter.reset"
        >Reset</q-btn
      >
    </div>

    <div class="col-12 text-center">
      <router-link class="text-primary" to="/">Return home</router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NumberCounter',
});
</script>

<script lang="ts" setup>
import { useCounterStore } from 'src/stores';

const counter = useCounterStore();
</script>
