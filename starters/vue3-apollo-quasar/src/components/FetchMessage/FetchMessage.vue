<template>
  <div>
    hello
    <!-- <p v-if="fetching">Fetching...</p>
  <p v-else>Message: {{ msg }}</p> -->
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

    const data = useResult(result, [], ({ user }) => ({
      ...user,
    }));
  },
});
</script>
