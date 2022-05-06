<template>
  <div>
    hello
    <p v-if="loading">Fetching...</p>
    <p v-else>Message: {{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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
    let msg = ref();

    const VUE_APOLLO_QUASAR_GREETING = gql`
      query ($greeting: String!) {
        hello(greeting: $greeting)
      }
    `;

    const { result, loading } = useQuery(VUE_APOLLO_QUASAR_GREETING, {
      greeting: props.message,
    });

    // console.log('====================================');
    // console.log(result);
    // console.log('====================================');

    const dataMsg = useResult(result, {}, (value) => value);
    console.log(dataMsg.value);

    // msg.value = dataMsg.value?.hello || 'Nothing';

    return { loading, msg };
  },
});
</script>
