<template>
  <div class="text-center q-mt-md">
    <p v-if="loading">Fetching...</p>
    <p v-else class="message text-body1">Message: {{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FetchMessage',
});
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const props = defineProps({
  message: {
    type: String,
    require: true,
  },
});

const VUE_APOLLO_QUASAR_GREETING = gql`
  query ($greeting: String!) {
    hello(greeting: $greeting)
  }
`;

const { result, loading } = useQuery(VUE_APOLLO_QUASAR_GREETING, {
  greeting: props.message,
});

const msg = computed(() => result.value?.hello ?? 'can not find greeting');
</script>
