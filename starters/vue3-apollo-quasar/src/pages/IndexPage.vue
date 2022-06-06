<template>
  <q-page class="row items-center justify-evenly column">
    <div>
      <h4>Vue3 Apollo Quasar Fetch Data from API</h4>
      <q-separator color="primary" size="4px" />
      <FetchMessage :message="message" />
    </div>
    <div>
      <h4 class="text-center">Increment, Decrement and Reset Button Example</h4>
      <q-separator color="primary" size="4px" />
      <NumberCounter />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NumberCounter } from 'src/components';
import FetchMessage from 'components/FetchMessage';

const message = ref('vue3-apollo-quasar starter.dev!');
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
});
</script>
