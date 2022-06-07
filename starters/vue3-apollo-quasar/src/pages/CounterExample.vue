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
import { inject } from 'vue';
import { useMeta } from 'quasar';
import { NumberCounter } from 'src/components';

const PRODUCT_NAME = inject('PRODUCT_NAME') as string;
useMeta({
  title: `Counter Component - ${PRODUCT_NAME}`,
});
</script>
