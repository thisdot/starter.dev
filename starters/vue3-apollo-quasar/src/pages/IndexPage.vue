<template>
  <q-page class="row items-center justify-evenly">
    <FetchMessage :message="message" />
    <NumberCounter />
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
