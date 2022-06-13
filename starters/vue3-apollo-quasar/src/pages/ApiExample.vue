<template>
  <div>
    <h4 class="text-center">Vue3 Apollo Quasar Fetch Data from API</h4>
    <q-separator color="primary" size="4px" />
    <FetchMessage :message="message" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMeta } from 'quasar';

export default defineComponent({
  name: 'PageApiExample',
});
</script>

<script lang="ts" setup>
import { inject, ref } from 'vue';
import { FetchMessage } from 'src/components';

const message = ref('vue3-apollo-quasar starter.dev!');

const PRODUCT_NAME = inject('PRODUCT_NAME') as string;
useMeta({
  title: `Api Component - ${PRODUCT_NAME}`,
});
</script>
