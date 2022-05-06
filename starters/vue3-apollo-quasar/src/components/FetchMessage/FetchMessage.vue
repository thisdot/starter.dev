<template>
  <div class="text-center q-mt-md">
    <p v-if="loading">Fetching...</p>
    <p v-else class="message text-body1">Message: {{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default defineComponent({
  name: 'FetchMessage',
  props: {
    message: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const VUE_APOLLO_QUASAR_GREETING = gql`
      query ($greeting: String!) {
        hello(greeting: $greeting)
      }
    `;

    const { result, loading } = useQuery(VUE_APOLLO_QUASAR_GREETING, {
      greeting: props.message,
    });

    const msg = useResult(result, null, ({ hello }) => hello);

    return { loading, msg };
  },
});
</script>
