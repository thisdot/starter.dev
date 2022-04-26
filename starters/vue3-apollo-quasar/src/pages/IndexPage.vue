<template>
  <q-page class="row items-center justify-evenly">
    <NumberCounter />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
});
</script>

<script lang="ts" setup>
import { NumberCounter } from 'src/components';
</script>
