<template>
<div>
  hello
  <!-- <p v-if="fetching">Fetching...</p>
  <p v-else>Message: {{ msg }}</p> -->
</div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'


export default defineComponent({
  name: 'FetchMessage',
  props: {
    message: {
      type: String,
      require: true,
    }
  },
  async setup(props) {
    const fetching = ref(true);

    const getMessage = async() => {
      const response  = await (await fetch(`https://api.starter.dev/hello?greeting=${props.message}`)).text();

      return response;
    }

    let msg = await getMessage();
    if(!msg) {
      msg = 'Failed to Fetch data'
    }
    fetching.value = false;

    return {msg, fetching}

  },
})
</script>

