<template>
  <q-layout class="row items-center justify-start column" view="lHh Lpr lFf">
    <q-header class="page-header">
      <q-toolbar>
        <q-toolbar-title class="text-center">{{ PRODUCT_NAME }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
});
</script>

<script lang="ts" setup>
import { useMeta } from 'quasar';
import { inject } from 'vue';

const PRODUCT_NAME = inject('PRODUCT_NAME') as string;
useMeta({
  title: PRODUCT_NAME,
});
</script>

<style lang="scss" scoped>
.page-header {
  position: relative;
  width: 100%;
  margin: 20px auto;
  @media (min-width: 1024px) {
    width: calc(100% - 420px);
  }
}
</style>
