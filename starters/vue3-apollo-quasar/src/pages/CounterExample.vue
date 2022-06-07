<template>
  <q-page class="row items-center column">
    <h4 class="text-center">Increment, Decrement and Reset Button Example</h4>
    <q-separator color="primary" size="4px" />
    <NumberCounter />
  </q-page>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CounterExample',
});
</script>

<script lang="ts" setup>
import { NumberCounter } from 'src/components';
</script>
