<template>
  <router-view />
  <div class="q-page-footer">
    <a href="https://www.netlify.com">
      <img
        src="https://www.netlify.com/v3/img/components/netlify-light.svg"
        alt="Deploys by Netlify"
      />
    </a>
  </div>
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
  min-height: unset !important;
}

.q-page-footer {
  display: flex;
  justify-content: center;
}
</style>
