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

provide('PRODUCT_NAME', 'Vue3 | Quasar & Apollo Starter kit');
</script>
