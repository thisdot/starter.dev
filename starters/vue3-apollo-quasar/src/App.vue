<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<script lang="ts" setup>
import { setupGraphQL } from './init';
setupGraphQL();

provide('PRODUCT_NAME', 'Vue 3, Quasar & Apollo Starter kit');
</script>

<style lang="scss">
.q-page {
  min-height: unset!important;
}
</style>

