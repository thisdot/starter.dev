<template>
  <div>
    <h4 class="text-center">Vue3 Apollo Quasar Fetch Data from API</h4>
    <q-separator color="primary" size="4px" />
    <FetchMessage :message="message" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ApiExample',
});
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import { FetchMessage } from 'src/components';

const message = ref('vue3-apollo-quasar starter.dev!');
</script>
