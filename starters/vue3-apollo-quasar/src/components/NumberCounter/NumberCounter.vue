<template>
  <section class="row q-col-gutter-lg">
    <div class="col-12 col-sm-3">
      <h6 class="text-weight-bold q-my-none">Count: {{ count }}</h6>
    </div>
    <div class="col-12 col-sm-3">
      <q-btn color="primary" unelevated @click="increment">Increment</q-btn>
    </div>
    <div class="col-12 col-sm-3">
      <q-btn color="primary" unelevated @click="decrement">Decrement</q-btn>
    </div>
    <div class="col-12 col-sm-3">
      <q-btn color="primary" unelevated @click="reset">Reset</q-btn>
    </div>

    <div class="col-12 text-center">
      <router-link class="text-primary" to="/">Return home</router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'NumberCounter',
});
</script>

<script lang="ts" setup>
const count = ref(0);

const increment = () => count.value++;
const decrement = () => count.value--;
const reset = () => (count.value = 0);
</script>
