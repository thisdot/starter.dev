<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { setupGraphQL } from './init';

export default defineComponent({
  name: 'App',
  setup() {
    setupGraphQL();
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
}
</style>
